import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tikee } from '../models';

@Entity()
export class LongSequence {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'integer' })
    /*@ManyToOne(type => Tikee)
    @JoinColumn({
        name: 'tikee_id',
    })
    @JoinColumn()*/
    tikee_id: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'text'})
    description: string;

    @Column({ type: 'datetime'})
    start: string;

    @Column({ type: 'datetime'})
    end: string;

    @Column({ type: 'boolean', default: true })
    upload_to_cloud: boolean;

    @Column({ type: 'varchar' })
    image_format: string;

    @Column({ type: 'boolean', default: false })
    keep_local_copy: boolean;

    @Column({ type: 'boolean', default: false})
    infinite_duration: boolean;

    @Column({ type: 'integer' })
    /*@ManyToOne(type => Sequence)
    @JoinColumn({ name: 'sequence_id' })*/
    sequence_id: number;

    @Column({ type: 'varchar', nullable: true})
    shooting_status: string;

    @Column({ type: 'integer', default: 0 })
    nb_images_on_sd: number;

    @Column({ type: 'integer', default: 0})
    nb_images_uploaded: number;
}
