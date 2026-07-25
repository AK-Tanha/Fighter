import { Entity, Index, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Bout } from './Bout.js';
import { RoundScore } from './RoundScore.js';


@Entity()
@Index(['bout', 'round_number'], { unique: true })

export class Round {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Bout, (bout) => bout.rounds)
    bout!: Bout;

    @Column({ type: 'int' })
    round_number!: number;

    @Column({ type: 'boolean', default: false })
    red_knockdown!: boolean;

    @Column({ type: 'boolean', default: false })
    blue_knockdown!: boolean;

    @OneToMany(() => RoundScore, (score) => score.round)
    scores!: RoundScore[];
}