import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamPokemonDto } from '../team-pokemon/dto/teamPokemon.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() teamDto: CreateTeamDto) {
    return this.teamService.create(teamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() teamDto: UpdateTeamDto) {
    return this.teamService.update(id, teamDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
      return this.teamService.remove(id);
  }

  @Post(':id/pokemon')
  addPokemon(@Param('id', ParseIntPipe) id: number, @Body() teamPokemonDto: TeamPokemonDto) {
      return this.teamService.addPokemon(id, teamPokemonDto);
  }

  @Get(':id/pokemon')
  listTeamPokemons(@Param('id', ParseIntPipe) id: number) {
      return this.teamService.listPokemonsByTeamId(id);
  }

  @Delete(':id/pokemon')
  removePokemon(@Param('id', ParseIntPipe) id: number, @Body() teamPokemonDto: TeamPokemonDto) {
      return this.teamService.removePokemon(id, teamPokemonDto);
  }

}
