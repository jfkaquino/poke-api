import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreatePokemonDto } from '../teamPokemon/dto/create-pokemon.dto';
import { TeamPokemon } from '../teamPokemon/entities/teamPokemon.entity';
import { PokeapiService } from '../pokeapi/pokeapi.service';
import { TeamResponseDto } from './dto/team-response.dto';
import { PokemonResponseDto } from '../teamPokemon/dto/pokemon-response.dto';

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

  async create(trainerId: number, createTeamDto: CreateTeamDto): Promise<TeamResponseDto> {
    const newTeam = this.teamRepository.create({ ...createTeamDto, trainerId });
    await this.teamRepository.save(newTeam);

    return {
      id: newTeam.id,
      name: newTeam.name,
      trainerId: newTeam.trainerId,
      pokemons: newTeam.pokemons
    }
  }

  async findAll(trainerId: number): Promise<TeamResponseDto[]> {
    const teams = await this.teamRepository.find({
      where: { trainerId }, relations: ['trainer', 'pokemons']
    });

    return teams.map(team => ({
      id: team.id,
      name: team.name,
      trainerId: team.trainerId,
      pokemons: team.pokemons
    }));
  }

  async findOne(trainerId: number, teamId: number): Promise<TeamResponseDto> {
    const team = await this.teamRepository.findOne({
      where: { trainerId, id: teamId }, relations: ['pokemons', 'trainer']
    })

    if(!team) throw new NotFoundException('Team not found');

    return {
      id: team.id,
      name: team.name,
      trainerId: team.trainerId,
      pokemons: team.pokemons
    };
  }

  async update(trainerId: number, teamId: number, updateTeamDto: UpdateTeamDto): Promise<TeamResponseDto> {
    await this.findOne(trainerId, teamId); // Check if the team exists
    await this.teamRepository.update(teamId, updateTeamDto);
    return this.findOne(trainerId, teamId);
  }

  async remove(trainerId: number, teamId: number): Promise<void> {
    const team = await this.findOne(trainerId, teamId);
    const result = await this.teamRepository.delete(team.id);

    if(result.affected == 0) throw new NotFoundException('Team not found');
  }

  async addPokemon(trainerId: number, teamId: number, teamPokemonDto: CreatePokemonDto): Promise<PokemonResponseDto> {
    const team = await this.findOne(trainerId, teamId);
    const pokemonIdOrName = teamPokemonDto.pokemonIdOrName.toLowerCase();

    const teamPokemonsCount = team.pokemons.length;
    if(teamPokemonsCount >= MAX_POKEMONS) throw new ConflictException('The team has reached the maximum number of Pokémons.');

    const detailedPokemon = await this.pokeapiService.getPokemonDetails(pokemonIdOrName);

    const isAlreadyAdded = team.pokemons.find(
      p => p.pokemonIdOrName === detailedPokemon.name
    )
    if(isAlreadyAdded) throw new ConflictException('The team already has this Pokémon.');

    const teamPokemon = this.teamPokemonRepository.create({
      team, pokemonIdOrName: detailedPokemon.name,
    })

    await this.teamPokemonRepository.save(teamPokemon);

    return {
      id: detailedPokemon.id,
      name: detailedPokemon.name,
      types: detailedPokemon.types,
      sprite: detailedPokemon.sprite
    }
  }

  async listPokemonsByTeamId(trainerId: number, teamId: number): Promise<PokemonResponseDto[]> {
    const team = await this.findOne(trainerId, teamId)

    if(team.pokemons.length === 0) return [];

    const getDetails = team.pokemons.map(
      pokemon => this.pokeapiService.getPokemonDetails(pokemon.pokemonIdOrName)
    )
    const detailedPokemons = await Promise.all(getDetails);

    return detailedPokemons.map(p => ({
      id: p.id,
      name: p.name,
      types: p.types,
      sprite: p.sprite
    }));

  }

  async removePokemon(trainerId: number, teamId: number, pokemonIdOrName: string): Promise<void> {
    const team = await this.findOne(trainerId, teamId);

    const detailedPokemon = await this.pokeapiService.getPokemonDetails(pokemonIdOrName.toLowerCase());

    const teamPokemon = await this.teamPokemonRepository.findOne({
      where: { team, pokemonIdOrName: detailedPokemon.name }
    });

    if (!teamPokemon) throw new NotFoundException('Pokémon not found.');

    await this.teamPokemonRepository.remove(teamPokemon);
  }

}
