import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './shared/database/database.service';
import { SequenceModule } from './resources/sequence/sequence.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { HttpRequestIdModule } from './shared/http-request-id/http-request-id.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService,
        }),
        InMemoryDBModule.forRoot({}),
        SequenceModule,
        HttpRequestIdModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
