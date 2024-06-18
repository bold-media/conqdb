import { Module } from '@nestjs/common';
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
        API_URL: Joi.string().default('http://localhost:8000'),
        FRONTEND_URL: Joi.string().default('http://localhost:3000'),
        MACHINE_ID: Joi.number().default(1),
        PORT: Joi.number().port().default(8000),
        COOKIE_SECRET: Joi.string().required(),
        ADMIN_API_KEY: Joi.string(),
        POSTGRES_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().port().default(6379),
        REDIS_PASS: Joi.string(),
        DISCORD_APPLICATION_ID: Joi.string().required(),
        DISCORD_PUBLIC_KEY: Joi.string().required(),
        DISCORD_CLIENT_ID: Joi.string().required(),
        DISCORD_CLIENT_SECRET: Joi.string().required(),
        DISCORD_BOT_TOKEN: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
