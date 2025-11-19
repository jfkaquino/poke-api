import { TeamPokemon } from '../../teamPokemon/entities/teamPokemon.entity';

export class TeamResponseDto {
  public id: number;
  public name: string;
  public trainerId: number;
  public pokemons: TeamPokemon[];
}
