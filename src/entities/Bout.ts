import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Official } from './Official.js';
import { Event } from './Event.js';
import { Round } from './Round.js';
import { Fighter } from './Fighter.js';


@Entity()
export class Bout {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Fighter, { nullable: false })
  @JoinColumn({ name: 'red_corner_fighter_id' })
  red_corner_fighter!: Fighter;

  @ManyToOne(() => Fighter, { nullable: false })
  @JoinColumn({ name: 'blue_corner_fighter_id' })
  blue_corner_fighter!: Fighter;


  @ManyToOne(() => Official, (official) => official.refereedBouts, { nullable: false })
  referee!: Official; // this person is refereeing THIS bout

  @ManyToMany(() => Official, (official) => official.judgedBouts)
  @JoinTable()
  judges!: Official[];

  @ManyToOne(() => Event, (event) => event.bouts)
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @Column({ type: 'boolean' })
  is_title_fight!: boolean;

  @Column({ type: 'boolean' })
  is_main_event!: boolean;

  @Column({ type: 'boolean' })
  is_co_main_event!: boolean;

  @Column({ type: 'int' })
  no_of_rounds!: number;

  @Column({ type: 'int' })
  round_time!: number;

  @OneToMany(() => Round, (round) => round.bout)
  rounds!: Round[];

}