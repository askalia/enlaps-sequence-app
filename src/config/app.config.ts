import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const withRateLimit = (app: NestFastifyApplication): NestFastifyApplication => {
    app.register(require('fastify-rate-limit'), {
        global : true, // default true
        max: parseInt(process.env.MAX_REQUESTS_IN_WINDOW, 10), // default 1000
        timeWindow: process.env.MAX_REQUESTS_TIME_WINDOW,
        cache: 10000, // default 5000
        //whitelist: ['127.0.0.1'], // default []
        //redis: new Redis({ host: '127.0.0.1' }), // default null
        skipOnError: true, // default false
        //keyGenerator: (req) => req.headers['x-request-id'],
        errorResponseBuilder: (req, context) => {
            return {
                statusCode: 429,
                error: 'Too Many Requests', 
                message: `Rate limit exceeded, retry in ${context.after}`
            };
        }
    });
    return app;
};

export const withClassValidation = (app: NestFastifyApplication): NestFastifyApplication => {
    (app as any).useGlobalPipes(new ValidationPipe());
    return app;
}

export const withRunning = async (app: NestFastifyApplication, onStarted?: () => any): Promise<NestFastifyApplication> => {

    await app.listen(
        process.env.PORT || 3000,
        process.env.HOST || '0.0.0.0',
        () => console.log(`server listens on http://${process.env.HOST || '0.0.0.0'}:${process.env.PORT || 3000}`)
    );
    return app;
}

export const withConfig = async (app: NestFastifyApplication): Promise<NestFastifyApplication> => {
    withRateLimit(app);
    withClassValidation(app);
    await withRunning(app);
    return Promise.resolve(app);
}