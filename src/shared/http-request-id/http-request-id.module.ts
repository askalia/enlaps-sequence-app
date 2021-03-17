import { Module } from '@nestjs/common';
import { HttpRequestIdService } from './http-request-id.service';

@Module({
    providers: [HttpRequestIdService],
    exports: [HttpRequestIdService]
})
export class HttpRequestIdModule {}
