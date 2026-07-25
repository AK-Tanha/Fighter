import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
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

  @Column({ type: 'simple-array' })
  certified_roles!: ('referee' | 'judge')[];

  @OneToMany(() => Bout, (bout) => bout.referee)
  refereedBouts!: Bout[];

  @ManyToMany(() => Bout, (bout) => bout.judges)
  judgedBouts!: Bout[];

}