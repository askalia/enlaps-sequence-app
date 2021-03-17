import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { RequestId } from './request-id.entity';
import * as moment from 'moment';
import { isNil } from 'lodash';

@Injectable()
export class HttpRequestIdService {

    private _memDB: InMemoryDBService<RequestId>;

    constructor() {
        this._memDB = this._createMemoryDB();
    }

    private _createMemoryDB(): InMemoryDBService<RequestId> {
        return new InMemoryDBService<RequestId>({ featureName: this.constructor.name })
    }

    addRequestId(xRequestId: string) {
        const req: RequestId | undefined = this.getRequest(xRequestId);
        const loggableRequestId = (): boolean => (isNil(req) || this.isRequestAccepted(req));

        loggableRequestId() && this._memDB.create({
            xRequestId,
            time: moment().utc().unix()
        });
    }

    getRequest(xRequestId: string): RequestId | undefined {
        return this._memDB.getAll().find((req: RequestId) => req.xRequestId === xRequestId);
    }

    getAll(){
        return this._memDB.getAll();
    }

    isRequestAccepted(requestId: string | RequestId): boolean {
        const request = typeof requestId === 'string' ? this.getRequest(requestId) : requestId;        
        const hasMadeSameRequestInPastPeriod = (checkReq: RequestId): boolean => {
            const timeAgoOfUniqueness: number = moment().utc().subtract((<any> process.env.REQUEST_ID_TIME_RANGE), (<any> process.env.REQUEST_ID_TIME_UNIT)).unix();
            return this._memDB.getAll() 
                    .filter((memReq: RequestId) => (memReq.xRequestId === checkReq.xRequestId && memReq.id !== checkReq.id))
                    .some((sameReq: RequestId) => sameReq.time >= timeAgoOfUniqueness)
        };
        return typeof request === 'undefined' || ! hasMadeSameRequestInPastPeriod(request);
    }

}
