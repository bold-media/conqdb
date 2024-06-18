import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { docsApiReference } from './config/docsApiReference.config';
import { swaggerConfig } from './config/swagger.config';
import { fastifyCookie } from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import { HEADERS } from './utils/constants';

async function migrateDatabase(databaseUrl: string) {
  const client = postgres(databaseUrl, { max: 1, onnotice: () => {} });
  const db = drizzle(client);
  const logger = new Logger('Migrations');

  try {
    logger.log('Running migrations...');

    await migrate(db, {
      migrationsFolder: path.join(__dirname, 'database', 'migrations'),
      migrationsTable: 'migrations',
    });

    logger.log('Migrations complete!');
  } catch (error) {
    logger.error('Migrations failed...');
    logger.error(error);
    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  await app.register(fastifyCors, {
    origin: configService.get('FRONTEND_URL'),
    allowedHeaders: ['Content-Type', 'Authorization', HEADERS.API_KEY],
    credentials: true,
  });

  await migrateDatabase(configService.get<string>('POSTGRES_URL'));

  const apiDocument = SwaggerModule.createDocument(app, swaggerConfig);

  const setupApiDocument = SwaggerModule.setup('docs', app, apiDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.use('/docs', docsApiReference(apiDocument));

  await app.register(fastifyCookie, {
    secret: configService.get<string>('COOKIE_SECRET'),
  });

  // app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
  //?

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configService.get('NODE_ENV') === 'production',
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const PORT = configService.get<number>('PORT');

  await app.listen(PORT);
}
bootstrap();
