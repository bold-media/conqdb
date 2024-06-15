import { Global, Module } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DATABASE_CONNECTION_KEY } from './database.decorator';
import { DatabaseService } from './database.service';
import { schema } from './schema/index.schema';
import { SERVICES } from '@app/utils/constants';

@Global()
@Module({
  providers: [
    { provide: SERVICES.DATABASE, useClass: DatabaseService },
    {
      provide: DATABASE_CONNECTION_KEY,
      inject: [SERVICES.DATABASE],
      useFactory: async (
        databaseService: DatabaseService,
      ): Promise<PostgresJsDatabase<typeof schema>> => {
        return databaseService.getDB();
      },
    },
  ],
  exports: [
    DATABASE_CONNECTION_KEY,
    { provide: SERVICES.DATABASE, useClass: DatabaseService },
  ],
})
export class DatabaseModule {}
