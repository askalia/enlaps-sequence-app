import { IsUUID, IsInt, IsDefined } from 'class-validator';
import { IRequestId } from './request-id.interface';
import { uuid } from 'uuid/v4';

export class RequestId implements IRequestId {

    public id: number;

    @IsUUID()
    @IsDefined()
    public xRequestId: string;

    @IsInt()
    @IsDefined()
    public time: number;

    private static _counter: number = 0;

    constructor(xRequestId?: string, time?: number) {
        this.id = ++ RequestId._counter;
        typeof xRequestId !== 'undefined' && (this.xRequestId = xRequestId);
        typeof time !== 'undefined' && (this.time = time);
    }
}