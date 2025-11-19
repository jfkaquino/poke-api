import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreatePokemonDto } from '../teamPokemon/dto/create-pokemon.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('trainers/:trainerId/teams')
@ApiTags('Teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new trainer\'s team' })
  create(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Body() teamDto: CreateTeamDto
  ) {
    return this.teamService.create(trainerId, teamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trainer\'s teams' })
  findAll(@Param('trainerId', ParseIntPipe) trainerId: number) {
    return this.teamService.findAll(trainerId);
  }

  @Get(':teamId')
  @ApiOperation({ summary: 'Get a trainer\'s team' })
  findOne(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Param('teamId', ParseIntPipe) teamId: number
  ) {
    return this.teamService.findOne(trainerId, teamId);
  }

  @Patch(':teamId')
  @ApiOperation({ summary: 'Update a trainer\'s team' })
  update(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() teamDto: UpdateTeamDto
  ) {
    return this.teamService.update(trainerId, teamId, teamDto);
  }

  @ApiOperation({ summary: 'Remove a trainer\'s team' })
  @Delete(':teamId')
  remove(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Param('teamId', ParseIntPipe) teamId: number
  ) {
      return this.teamService.remove(trainerId, teamId);
  }

  @Post(':teamId/pokemons')
  @ApiOperation({ summary: 'Add a Pokemon in a trainer\'s team' })
  addPokemon(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() teamPokemonDto: CreatePokemonDto
  ) {
      return this.teamService.addPokemon(trainerId, teamId, teamPokemonDto);
  }

  @Get(':teamId/pokemons')
  @ApiOperation({ summary: 'Get all detailed Pokemons in a trainer\'s team' })
  listTeamPokemons(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Param('teamId', ParseIntPipe) teamId: number
  ) {
      return this.teamService.listPokemonsByTeamId(trainerId, teamId);
  }

  @Delete(':teamId/pokemons/:pokemonIdOrName')
  @ApiOperation({ summary: 'Remove a Pokemon in a trainer\'s team' })
  removePokemon(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('pokemonIdOrName') pokemonIdOrName: string
  ) {
      return this.teamService.removePokemon(trainerId, teamId, pokemonIdOrName);
  }

}
