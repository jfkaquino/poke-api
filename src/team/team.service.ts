import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamPokemonDto } from '../team-pokemon/dto/teamPokemon.dto';
import { TeamPokemon } from '../team-pokemon/entities/teamPokemon.entity';
import { PokeapiService } from '../pokeapi/pokeapi.service';

const MAX_POKEMONS = 6;

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(TeamPokemon)
    private teamPokemonRepository: Repository<TeamPokemon>,
    private pokeapiService: PokeapiService,
  ){}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const newTeam = this.teamRepository.create(createTeamDto);
    return this.teamRepository.save(newTeam);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['trainer', 'pokemons'] });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id }, relations: ['pokemons', 'trainer']
    })

    if(!team){
      throw new NotFoundException();
    }

    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    await this.findOne(id);
    await this.teamRepository.update(id, updateTeamDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.teamRepository.delete(id);

    if(result.affected == 0){
      throw new NotFoundException();
    }
  }

  async addPokemon(teamId: number, teamPokemonDto: TeamPokemonDto): Promise<TeamPokemon> {
    const team = await this.findOne(teamId);
    const pokemonIdOrName = teamPokemonDto.pokemonIdOrName.toLowerCase();

    const pokemonDetails = await this.pokeapiService.getPokemonDetails(pokemonIdOrName);

    const teamPokemonsCount = await this.teamPokemonRepository.count({ where: { team } });
    if(teamPokemonsCount >= MAX_POKEMONS){
      throw new ConflictException();
    }

    const isAlreadyAdded = await this.teamPokemonRepository.findOne({
      where: { team, pokemonIdOrName: pokemonDetails.name }
    });
    if(isAlreadyAdded){
      throw new ConflictException();
    }

    const teamPokemon = this.teamPokemonRepository.create({
      team,
      pokemonIdOrName: pokemonDetails.name,
    })

    return this.teamPokemonRepository.save(teamPokemon);
  }

  async listPokemonsByTeamId(teamId: number): Promise<any[]> {
    const team = await this.findOne(teamId)
    const teamPokemons = await this.teamPokemonRepository.find({ where: { team: { id: team.id } } });

    if(teamPokemons.length === 0){
      return [];
    }

    const getDetails = teamPokemons.map(
      pokemon => this.pokeapiService.getPokemonDetails(pokemon.pokemonIdOrName)
    )
    const detailedPokemons = await Promise.all(getDetails);

    return detailedPokemons.map(p => ({
      id: p.id,
      name: p.name,
      types: p.types.map(t => t.type.name),
      sprite: p.sprites.front_default
    }));

  }

  async removePokemon(teamId: number, teamPokemonDto: TeamPokemonDto): Promise<void> {
      const team = await this.findOne(teamId);
      const pokemonIdOrName = teamPokemonDto.pokemonIdOrName.toLowerCase();

      const teamPokemon = await this.teamPokemonRepository.findOne({ where: { team, pokemonIdOrName } });
      if (!teamPokemon) {
          throw new NotFoundException();
      }

      await this.teamPokemonRepository.remove(teamPokemon);
  }

}
