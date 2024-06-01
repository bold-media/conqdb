import { Controller, Delete, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { ROUTES, SERVICES } from "@app/utils/constants";

@Controller(ROUTES.CACHE)
export class CacheController {
    constructor(
        @Inject(SERVICES.CACHE) private readonly cacheService: CacheService
    ) {}

    @Get()
    async cacheStore() {
        const store = await this.cacheService.cacheStore();
        return {
            success: true,
            status: 200,
            data: store
        }
    }

    @Get('/:key')
    async getCacheKey(@Param('key') key: string) {
        const data = await this.cacheService.getCacheKey(key);
        return {
            success: true,
            status: 200,
            data
        }
    }

    @Post()
    async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
        await this.cacheService.setCacheKey(key, value);
        return {
            success: true,
            status: 201,
            message: `Key: ${key}, with value: ${value} has been set`
        }
    }

    @Delete('/:key')
    async deleteCacheKey(@Param('key') key: string) {
        await this.cacheService.deleteCacheKey(key);
        return {
            success: true,
            status: 201,
            message: `Key: ${key} has been deleted.`
        }
    }

    @Get('/reset')
    async resetCache() {
        await this.cacheService.resetCache();
        return {
            success: true,
            status: 200,
            message: 'Cache has been reset.'
        }
    }
}