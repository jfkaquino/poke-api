import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { TeamPokemon } from 'src/team-pokemon/entities/teamPokemon.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  trainerId: number;

  @ManyToOne(() => Trainer, trainer => trainer.teams, { onDelete: 'CASCADE' })
  trainer: Trainer;

  @OneToMany(() => TeamPokemon, tp => tp.team, { cascade: true })
  pokemons: TeamPokemon[];
}
