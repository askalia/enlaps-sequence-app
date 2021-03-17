import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, SelectQueryBuilder } from 'typeorm';
import { ShortSequence } from '../../../resources/sequence/models'; 
import * as moment from 'moment';
import { ShortSequenceDTO } from '../../../resources/sequence/models/short-sequence.dto';
import { isNil } from 'lodash';

@Injectable()
export class ShortSequenceService {
    constructor(
        @InjectRepository(ShortSequence)
        private readonly _shortSequenceRepository: Repository<ShortSequence>
    ) {}

    public async getSequencesOfTikee(tikee_id: number): Promise<ShortSequence[]> {
        return await this._shortSequenceRepository.find({ tikee_id });
    }

    public async getOneById(id: number): Promise<ShortSequence> {
        return await this._shortSequenceRepository.findOneOrFail(id);
    }

    public async createOne(sequenceDTO: ShortSequenceDTO): Promise<ShortSequenceDTO> {
        if (true === await this.overLapsAnotherSequence(sequenceDTO)) {
            throw new BadRequestException('This sequence overlaps another.');
        }
        return await this._shortSequenceRepository.save(
        {
            ...sequenceDTO,
            start : moment(sequenceDTO.start).utc().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
        });
    }

    public async updateOne(id: number, sequenceDTO: ShortSequenceDTO): Promise<UpdateResult> {

        const getSequenceDTO = (seq: ShortSequenceDTO): ShortSequenceDTO => {
            return isNil(seq.start)
                    ? seq
                    : {
                        ...seq,
                        start: moment(seq.start).utc().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
                    };
        };

        return await this._shortSequenceRepository.update(id, getSequenceDTO(sequenceDTO));
    }

    public async deleteOne(id: number): Promise<DeleteResult> {
        return await this._shortSequenceRepository.delete(id);
    }

    public async overLapsAnotherSequence(sequence: ShortSequenceDTO): Promise<boolean> {
        const countSeqsWithSameTime = await this._countSequencesWithSameTime(sequence);
        return Promise.resolve(countSeqsWithSameTime > 0);
    }

    private async _countSequencesWithSameTime(candidateSequence: ShortSequenceDTO): Promise<number> {
        const sequenceStartAsTimestamp = moment(candidateSequence.start).utc().unix();
        const sequenceEndAsTimestamp = moment(candidateSequence.start).add(candidateSequence.duration, 'seconds').utc().unix();

        const sqlStatement: SelectQueryBuilder<ShortSequence> = this._shortSequenceRepository
            .createQueryBuilder('sseq')
            .where(`UNIX_TIMESTAMP(sseq.start)
                    BETWEEN ${sequenceStartAsTimestamp} AND ${sequenceEndAsTimestamp}`)
            .orWhere(`UNIX_TIMESTAMP(DATE_ADD(sseq.start, INTERVAL sseq.duration SECOND))
                      BETWEEN ${sequenceStartAsTimestamp} AND ${sequenceEndAsTimestamp}`);

        return await sqlStatement.getCount();
    }
}
