import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

    @Column({ type: 'array', nullable: true })
    bout_ids!: string[];

    @Column({ type: 'numeric'})
    total_bouts!: number;

    @Column({ type: 'date' })
    created_at!: string;

    @Column({ type: 'date' })
    updated_at!: string;

}