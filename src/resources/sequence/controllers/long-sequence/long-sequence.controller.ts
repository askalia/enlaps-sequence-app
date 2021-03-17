import { Controller, Get, Param, Query, HttpStatus, HttpException, Post, Body, Put, Delete } from '@nestjs/common';
import { LongSequenceService } from '../../../../shared/sequence';
import { LongSequence, LongSequenceDTO } from '../../models';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('/long_sequences')
export class LongSequenceController {

    constructor(
        private readonly _longSequenceService: LongSequenceService
    ){}

    @Get()
    public async getAllSequencesOfTikee(@Query('tikee_id') tikeeId: number): Promise<LongSequence[]>{
        return await this._longSequenceService.getSequencesOfTikee(tikeeId);
    }

    @Get(':id')
    public async getOneById(@Param('id') id: number): Promise<LongSequence> {
        try {
            return await this._longSequenceService.getOneById(id);
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
    public async createOne(@Body() longSequenceDTO: LongSequenceDTO): Promise<LongSequenceDTO> {
        try {
            return await this._longSequenceService.createOne(longSequenceDTO);
        }
        catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    public async updateOne(@Param('id') id: number, @Body() sequenceDTO: LongSequenceDTO): Promise<{ updated: boolean}> {
        try {
            await this._longSequenceService.getOneById(id);
            const updateResult: UpdateResult = await this._longSequenceService.updateOne(id, sequenceDTO);
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
            await this._longSequenceService.getOneById(id);
            const deleteResult: DeleteResult = await this._longSequenceService.deleteOne(id);
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
