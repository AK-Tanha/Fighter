import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  red_corner_fighter_id!: string;

  @Column({ type: 'varchar' })
  blue_corner_fighter_id!: string;

  @Column({ type: 'varchar' })
  event_id ?: string;

  @Column({ type: 'varchar' })
  referee_id!: string;

  @Column({ type: 'array' })
  judges_ids!: string[];

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
  

}