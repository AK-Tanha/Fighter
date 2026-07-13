import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Referee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  nationality?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: string;

  @Column({ type: 'boolean', nullable: true })
  is_active?: boolean;

}