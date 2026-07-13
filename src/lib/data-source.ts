import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Fighter } from '../entities/Fighter.js';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'dev.db',
  synchronize: true, // dev only — auto-creates tables from entities
  logging: true,
  entities: [Fighter],
});