import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env,', '.env.development.local'],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('development'),
                PORT: Joi.number().port().default(8000),
                POSTGRES_URL: Joi.string().required(),
                REDIS_HOST: Joi.string().required(),
                REDIS_PORT: Joi.number().port().default(6379),
                REDIS_PASS: Joi.string(),
            })
        })
    ]
})

export class ConfigModule {}