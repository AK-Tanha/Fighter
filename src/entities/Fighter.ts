import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  nickname?: string;

  @Column({ type: 'varchar', nullable: true })
  nationality?: string;

  @Column({ type: 'varchar', nullable: true })
  club?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: string;

  @Column({ type: 'varchar', nullable: true })
  weight_class!: string;

  @Column({type: 'varchar', nullable: true})
  gender!: 'male' | 'female';

  @Column({ type: 'simple-json', nullable: true})
  weight?: {
    value: number;
    updated_at: Date;
  };
}