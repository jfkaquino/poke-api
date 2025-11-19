import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';

@Entity()
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonIdOrName: string;

  @ManyToOne(() => Team, team => team.pokemons, { onDelete: 'CASCADE' })
  team: Team;
}
