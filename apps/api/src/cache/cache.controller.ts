import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CacheService } from './cache.service';
import { ROUTES, SERVICES } from '@app/utils/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CacheItemCreatedResponseDto,
  CacheItemDeletedResponseDto,
  CacheItemNotFoundResponseDto,
  CacheItemResponseDto,
  SetCacheItemDto,
} from './dto/cacheItem.dto';
import {
  CacheKeysResetResponseDto,
  CacheKeysResponseDto,
} from './dto/cacheKeys.dto';
import { Public } from '@app/auth/decorators/public.decorator';

@ApiTags(ROUTES.CACHE.toUpperCase())
@Controller(ROUTES.CACHE)
export class CacheController {
  constructor(
    @Inject(SERVICES.CACHE) private readonly cacheService: CacheService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get All Cache Keys',
  })
  @ApiResponse({
    status: 200,
    description: '**OK**',
    type: CacheKeysResponseDto,
  })
  async cacheStore(): Promise<CacheKeysResponseDto> {
    const store = await this.cacheService.cacheStore();
    return {
      success: true,
      statusCode: 200,
      keys: store,
    };
  }

  @Get('/:key')
  @ApiOperation({ summary: 'Get Cache Item by Key' })
  @ApiResponse({
    status: 200,
    description: '**OK**',
    type: CacheItemResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '**Not Found**',
    type: CacheItemNotFoundResponseDto,
  })
  async getCacheKey(@Param('key') key: string): Promise<CacheItemResponseDto> {
    const data = await this.cacheService.getCacheKey(key);
    return {
      success: true,
      statusCode: 200,
      cache: {
        key,
        value: data,
      },
    };
  }

  @Post()
  @ApiOperation({ summary: 'Set Cache Item' })
  @ApiResponse({
    status: 201,
    description: '**Created**',
    type: CacheItemCreatedResponseDto,
  })
  async setCacheKey(
    @Body() { key, value }: SetCacheItemDto,
  ): Promise<CacheItemCreatedResponseDto> {
    await this.cacheService.setCacheKey(key, value);
    return {
      success: true,
      statusCode: 201,
      cache: {
        key,
        value,
      },
    };
  }

  @Delete('/:key')
  @ApiOperation({ summary: 'Delete Cache Item by Key' })
  @ApiResponse({
    status: 204,
    description: '**Deleted**',
    type: CacheItemDeletedResponseDto,
  })
  async deleteCacheKey(
    @Param('key') key: string,
  ): Promise<CacheItemDeletedResponseDto> {
    await this.cacheService.deleteCacheKey(key);
    return {
      cache: null,
      success: true,
      statusCode: 204,
    };
  }

  @Public()
  @Get('/reset')
  @ApiOperation({ summary: 'Reset Cache' })
  @ApiResponse({
    status: 200,
    description: '**Deleted**',
    type: CacheKeysResetResponseDto,
  })
  async resetCache(): Promise<CacheKeysResetResponseDto> {
    await this.cacheService.resetCache();
    return {
      keys: [],
      success: true,
      statusCode: 200,
    };
  }
}
