import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { IsUUID, IsInt } from 'class-validator';

export interface IRequestId extends InMemoryDBEntity {
    xRequestId: string;
    time: number;
  }