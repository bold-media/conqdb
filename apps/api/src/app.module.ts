import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';


@Module({
  imports: [ConfigModule, CacheModule, DatabaseModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
