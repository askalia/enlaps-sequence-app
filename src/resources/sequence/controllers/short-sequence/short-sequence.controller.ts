import { Controller, Get, Param, Query, HttpException, HttpStatus, Body, Post, Put, Delete, BadRequestException, Headers } from '@nestjs/common';
import { ShortSequence } from '../../models/short-sequence.entity';
import { ShortSequenceService } from '../../../../shared/sequence/short-sequence/short-sequence.service';
import { ShortSequenceDTO } from '../../models/short-sequence.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpRequestIdService } from '../../../../shared/http-request-id/http-request-id.service';
import { isNil } from 'lodash';

@Controller('/short_sequences')
export class ShortSequenceController {

    constructor(
        private readonly _shortSequenceService: ShortSequenceService,
        private readonly _requestIdService: HttpRequestIdService
    ){}

    @Get()
    public async getAllSequencesOfTikee(@Query('tikee_id') tikeeId: number): Promise<ShortSequence[]> {
        if (isNil(tikeeId)){
            throw new HttpException(
                'tikee_id must be provided',
                HttpStatus.BAD_REQUEST);
        }
        return await this._shortSequenceService.getSequencesOfTikee(tikeeId);
    }

    @Get(':id')
    public async getOneById(@Param('id') id: number): Promise<ShortSequence> {
        try {
            if (isNil(id)){
                throw new HttpException(
                    'short_sequence id must be provided',
                    HttpStatus.BAD_REQUEST);
            }
            return await this._shortSequenceService.getOneById(id);
        }
        catch(e)
        {
            throw new HttpException(
                `Sequence not found with id ${id}`,
                HttpStatus.NOT_FOUND
                );
        }
    }

    @Post()
    public async createOne(@Body() shortSequence: ShortSequenceDTO){
        try {
            return await this._shortSequenceService.createOne(shortSequence);
        }
        catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    public async updateOne(@Param('id') id: number, @Body() sequenceDTO: ShortSequenceDTO): Promise<{ updated: boolean}> {
        try {
            await this._shortSequenceService.getOneById(id);
            const updateResult: UpdateResult = await this._shortSequenceService.updateOne(id, sequenceDTO);
            return {
                updated: (updateResult.raw.affectedRows === 1)
            };
        }
        catch(e) {
            throw new HttpException(
                `Sequence to update was not found with id ${id}`,
                HttpStatus.NOT_FOUND
            );
        }
    }

    @Delete(':id')
    public async deleteOne(@Param('id') id: number): Promise<{ deleted: boolean}> {
        try {
            await this._shortSequenceService.getOneById(id);
            const deleteResult: DeleteResult = await this._shortSequenceService.deleteOne(id);
            return {
                deleted: (deleteResult.raw.affectedRows === 1)
            };
        }
        catch(e) {
            throw new HttpException(
                `Sequence to delete was not found with id ${id}`,
                HttpStatus.NOT_FOUND
            );
        }
        
    }
}
