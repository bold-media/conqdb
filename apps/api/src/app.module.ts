import { Module, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [ConfigModule, CacheModule, DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [
    AppService,
    { provide: APP_GUARD, scope: Scope.REQUEST, useClass: AuthGuard },
  ],
})
export class AppModule {}
