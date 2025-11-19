import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { PokeapiModule } from '../pokeapi/pokeapi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamPokemon } from '../teamPokemon/entities/teamPokemon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamPokemon]),
    PokeapiModule
  ],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
