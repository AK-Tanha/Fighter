import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Official } from './Official.js';
import { Event } from './Event.js';


@Entity()
export class Bout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  red_corner_fighter_id!: string;

  @Column({ type: 'varchar' })
  blue_corner_fighter_id!: string;

  @Column({ type: 'varchar' })
  event_id?: string;

  @ManyToOne(() => Official)
  referee!: Official; // this person is refereeing THIS bout

  @ManyToMany(() => Official)
  @JoinTable()
  judges!: Official[]; // these people are judging THIS bout

  @ManyToOne(() => Event, (event) => event.bouts)
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @Column({ type: 'boolean' })
  is_title_fight!: boolean;

  @Column({ type: 'boolean' })
  is_main_event!: boolean;

  @Column({ type: 'boolean' })
  is_co_main_event!: boolean;

  @Column({ type: 'numeric' })
  no_of_rounds!: string;

  @Column({ type: 'numeric' })
  round_time!: string;

  @Column({ type: 'json' })
  results!: {
    red_corner_score: number;
    blue_corner_score: number;
    winner: 'red' | 'blue' | 'draw';
    is_stopage: boolean;
    stopage_time: string;
    other_notes: string;

  };

  @Column({ type: 'json' })
  judges_scores!: {
    judge_id: string;
    red_corner_score: number;
    blue_corner_score: number;
  }[];

}