import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Round } from './Round.js';
import { Official } from './Official.js';

@Entity()
@Unique(['round', 'official'])
export class RoundScore {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Round, (round) => round.scores)
  round!: Round;

  @ManyToOne(() => Official)
  official!: Official; // the person acting as judge for this score

  @Column({ type: 'int' })
  red_score!: number;

  @Column({ type: 'int' })
  blue_score!: number;
}