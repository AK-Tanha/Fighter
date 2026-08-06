import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @Column({ type: 'varchar' })
    location!: string;

    @OneToMany(() => Bout, (bout) => bout.event) 
    bouts!: Bout[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}