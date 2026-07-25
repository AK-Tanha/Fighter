import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Fighter } from '../entities/Fighter.js';
import { Official } from '../entities/Official.js';
import { Bout } from '../entities/Bout.js';
import { Event } from '../entities/Event.js';
import { RoundScore } from '../entities/RoundScore.js';
import { Round } from '../entities/Round.js';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'dev.db',
  synchronize: true, // dev only — auto-creates tables from entities
  logging: true,
  entities: [Fighter, Official, Event, Bout, Round, RoundScore],
});