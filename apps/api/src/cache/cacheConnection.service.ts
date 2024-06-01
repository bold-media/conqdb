import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheConnectionService implements OnModuleInit {
    private readonly logger = new Logger(CacheConnectionService.name);
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async onModuleInit() {
        try {
            await this.cacheManager.set('test_key', 'test_value');
            const value = await this.cacheManager.get('test_key');

            if (value === 'test_value') {
                this.logger.log('Redis connection established successfully.')
                this.cacheManager.del('test_key')
            } else {
                this.logger.error('Failed to verify Redis connection...')
            }
        } catch (err) {
            this.logger.error(`Error connecting to Redis: ${err}`)
        }
    }
}