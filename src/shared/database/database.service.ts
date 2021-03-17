import { Injectable } from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        
        return {
            type: process.env.DB_TYPE as MysqlConnectionOptions['type'],
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_NAME,
            entities: [process.env.DB_ENTITIES_DIR.replace('{DIRNAME}', __dirname)],
            [process.env.DB_ENTITIES_DIRNAME]: [process.env.DB_MIGRATIONS_DIR.replace('{DIRNAME}', __dirname)],
            cli: {
                migrationsDir: process.env.DB_ENTITIES_DIRNAME
            },
            synchronize: !!parseInt(process.env.DB_SCHEMA_SYNCHRONIZE, 10)
        };
    }
}
