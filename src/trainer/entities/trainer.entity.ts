import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  cityOfOrigin?: string;

  @OneToMany(() => Team, team => team.trainer)
  teams: Team[];
}
