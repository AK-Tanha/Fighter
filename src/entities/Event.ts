import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bout } from "./Bout.js";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    title!: string;  

    @Column({ type: 'varchar', nullable: true })
    sub_title?: string;  

    @Column({ type: 'varchar', nullable: true })
    description?: string;  

    @Column({ type: 'date' })
    date!: string;

    @OneToMany(() => Bout, (bout) => bout.event) 
    bouts!: Bout[];

    @Column({ type: 'varchar' })
    location!: string;

    @Column({ type: 'simple-array', nullable: true })
    bout_ids!: string[];

    @Column({ type: 'numeric'})
    total_bouts!: number;

    @Column({ type: 'date' })
    created_at!: string;

    @Column({ type: 'date' })
    updated_at!: string;

}