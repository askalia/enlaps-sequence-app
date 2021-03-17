import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortSequence, LongSequence, Tikee } from './models';
import { ShortSequenceService } from '../../shared/sequence/short-sequence/short-sequence.service';
import { ShortSequenceController } from './controllers/short-sequence/short-sequence.controller';
import { LongSequenceController } from './controllers/long-sequence/long-sequence.controller';
import { LongSequenceService } from '../../shared/sequence/long-sequence/long-sequence.service';
import { HttpRequestIdModule } from '../../shared/http-request-id/http-request-id.module';
import { HttpRequestIdMiddleware } from '../../shared/http-request-id/middlewares/http-request-id.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tikee, LongSequence, ShortSequence]),
        HttpRequestIdModule
    ],
    providers: [ShortSequenceService, LongSequenceService],
    controllers: [ShortSequenceController, LongSequenceController],
})
export class SequenceModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(HttpRequestIdMiddleware)
          .forRoutes(ShortSequenceController, LongSequenceController);
    }
}
