import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async setCacheKey(key: string, value: string): Promise<void> {
        await this.cacheManager.set(key, value)
    }

    async getCacheKey(key: string): Promise<string> {
        const value: string = await this.cacheManager.get(key)

        if (!value) {
            throw new NotFoundException(
            `Cache key: '${key}' not found`
            )
        }

        return value
    }

    async deleteCacheKey(key: string): Promise<void> {
        await this.cacheManager.del(key)
    }

    async resetCache(): Promise<void> {
        await this.cacheManager.reset();
    }

    async cacheStore(): Promise<string[]> {
        return await this.cacheManager.store.keys();
    }
}