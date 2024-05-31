import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Logger } from '@nestjs/common';
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import path from 'path';

async function migrateDatabase(databaseUrl: string) {
  const client = postgres(databaseUrl, { max: 1, onnotice: () => {}})
  const db = drizzle(client);
  const logger = new Logger('Migrations')

  try {
    logger.log('Running migrations...');

    await migrate(db, { migrationsFolder: path.join(__dirname, "database", "migrations"), migrationsTable: 'migrations'});

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
    new FastifyAdapter()
  )

  const configService = app.get(ConfigService);

  await migrateDatabase(configService.get<string>('POSTGRES_URL'));

  const PORT = configService.get<number>('PORT');

  await app.listen(PORT)
}
bootstrap();
