import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sequence {

    @PrimaryGeneratedColumn()
    id?: number;
}