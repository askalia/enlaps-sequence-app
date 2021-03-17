import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tikee {

    @PrimaryGeneratedColumn()
    id?: number;
}