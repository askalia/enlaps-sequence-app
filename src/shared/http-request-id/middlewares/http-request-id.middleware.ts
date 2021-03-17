import { Injectable, NestMiddleware, HttpStatus, HttpException, Request, Response } from '@nestjs/common';
import { HttpRequestIdService } from '../http-request-id.service';

@Injectable()
export class HttpRequestIdMiddleware implements NestMiddleware {

    constructor(
        private readonly _requestIdService: HttpRequestIdService
    ) {
    }

    use(req: Request, res: Response, next: Function) {
        const rawXRequestId: string | undefined | string[] = req.headers['x-request-id'];
        const xRequestId = Array.isArray(rawXRequestId) ? rawXRequestId.shift() : rawXRequestId;
        if (typeof xRequestId === 'undefined') {
            throw new HttpException(
                'Request was sent without providing X-Request-Id header. Please provide a one-time request ID', 
                HttpStatus.FORBIDDEN
            );
        }
        this._requestIdService.addRequestId(xRequestId);
        if (! this._requestIdService.isRequestAccepted(xRequestId)) {
            throw new HttpException(
                'This request was send too many times. Please retry in the next 24h', 
                HttpStatus.FORBIDDEN
            );
        }
        else {
            next();
        }
    }
}
