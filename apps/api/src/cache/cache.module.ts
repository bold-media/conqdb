import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheConnectionService } from './cacheConnection.service';
import { SERVICES } from '@app/utils/constants';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        auth_pass: configService.get<string>('REDIS_PASS'),
        ttl: 3600,
      }),
    }),
  ],
  controllers: [CacheController],
  providers: [
    CacheConnectionService,
    {
      provide: SERVICES.CACHE,
      useClass: CacheService,
    },
  ],
  exports: [NestCacheModule, SERVICES.CACHE],
})
export class CacheModule {}
