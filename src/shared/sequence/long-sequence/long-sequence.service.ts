import * as moment from 'moment';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, SelectQueryBuilder } from 'typeorm';
import { LongSequence, LongSequenceDTO } from '../../../resources/sequence/models';
import { isNil } from 'lodash';

@Injectable()
export class LongSequenceService {
    constructor(
        @InjectRepository(LongSequence)
        private readonly _longSequenceRepository: Repository<LongSequence>
    ) {}

    public async getSequencesOfTikee(tikee_id: number): Promise<LongSequence[]> {
        return await this._longSequenceRepository.find({ tikee_id });
    }

    public async getOneById(id: number): Promise<LongSequence> {
        return await this._longSequenceRepository.findOneOrFail(id);
    }

    public async createOne(sequenceDTO: LongSequenceDTO): Promise<LongSequenceDTO> {
        if (true === await this.overLapsAnotherSequence(sequenceDTO)) {
            throw new BadRequestException('This sequence overlaps another.');
        }
        return await this._longSequenceRepository.save(
        {
            ...sequenceDTO,
            start : moment(sequenceDTO.start).utc().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
            end : moment(sequenceDTO.end).utc().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
        });
    }

    public async updateOne(id: number, sequenceDTO: LongSequenceDTO): Promise<UpdateResult> {

        const getSequenceDTO = (seq: LongSequenceDTO): LongSequenceDTO => {
            if (isNil(seq.start) || isNil(seq.end)){
                return seq;
            }
            const alterSeq = { ...seq };
            if (! isNil(alterSeq.start)) {
                alterSeq.start = moment(seq.start).utc().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)  
            }
            if (! isNil(alterSeq.end)) {
                alterSeq.end = moment(seq.end).utc().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)  
            }
            return alterSeq;
        };
        return await this._longSequenceRepository.update(id, getSequenceDTO(sequenceDTO));
    }

    public async deleteOne(id: number): Promise<DeleteResult> {
        return await this._longSequenceRepository.delete(id);
    }

    public async overLapsAnotherSequence(sequence: LongSequenceDTO): Promise<boolean> {

        const getSqlStatement = (seq: LongSequenceDTO): SelectQueryBuilder<LongSequence> => {
            const sequenceStartAsTimestamp = moment(seq.start).utc().unix();
            const sequenceEndAsTimestamp = moment(seq.end).utc().unix();

            return this._longSequenceRepository
                .createQueryBuilder('lseq')
                .where(`UNIX_TIMESTAMP(lseq.start)
                        BETWEEN ${sequenceStartAsTimestamp} AND ${sequenceEndAsTimestamp}`)
                .orWhere(`UNIX_TIMESTAMP(lseq.end)
                          BETWEEN ${sequenceStartAsTimestamp} AND ${sequenceEndAsTimestamp}`);
        };

        const howManyOverlapsFound: number = await getSqlStatement(sequence).getCount();
        return Promise.resolve(howManyOverlapsFound > 0);
    }
}
