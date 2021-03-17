import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
  } from '@nestjs/platform-fastify';

  import { withConfig } from './config/app.config';

async function bootstrap() {
    
    if (! process.env.NODE_ENV.includes('prod')){
        require('dotenv').config({ path : `${__dirname}/../.env.${(process.env.NODE_ENV || 'dev')}`});
    }
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    withConfig(app);
}
bootstrap();
