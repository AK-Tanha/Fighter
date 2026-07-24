import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bout } from './Bout.js';

@Entity()
export class Official {
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

  @OneToMany(() => Bout, (bout) => bout.referee)
  bouts!: Bout[];

  @Column({ type: 'simple-array' })
  certified_roles!: ('referee' | 'judge')[];

}