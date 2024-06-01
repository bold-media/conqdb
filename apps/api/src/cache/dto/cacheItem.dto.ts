import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CacheItemDto {
    @ApiProperty({
        description: 'Unique cache key, to identify the stored value',
        example: 'my-cache-key',
    })
    @IsString()
    key: string;

    @ApiProperty({
        description: 'Value to store in cache',
        example: 'Your cached value to store'
    })
    @IsString()
    value: string
}

export class CacheItemNotFoundResponseDto {
    @ApiProperty({
        description: 'Error message',
        example: `Cache key: 'example-key' not found`
    })
    message: string;

    @ApiProperty({
        description: 'Error code',
        example: 'Not Found'
    })
    error: string;

    @ApiProperty({
        description: 'Status code',
        example: 404
    })
    statusCode: number;
}

export class SetCacheItemDto {
    @IsNotEmpty()
    @MaxLength(256)
    @IsString()
    @ApiProperty({ example: 'my-key', description: 'Unique cache key, to identify the stored value'})
    key: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Your cached value to store', description: 'Value to store in cache'})
    value: string;
}

export class CacheItemResponseDto {
    @ApiProperty({
        type: Object,
        description: 'Key and value of cache item',
        example: {
            key: 'example-key',
            value: 'Example cached value'
        }
    })
    cache: {
        key: string,
        value: string
    }
    
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 200 })
    statusCode: number
}

export class CacheItemCreatedResponseDto {
    @ApiProperty({
        type: Object,
        description: 'Key and value of cache item',
        example: {
            key: 'example-key',
            value: 'Example cached value'
        }
    })
    cache: {
        key: string,
        value: string
    }
    
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 201 })
    statusCode: number
}

export class CacheItemDeletedResponseDto {
    cache: null;

    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 204 })
    statusCode: 204
}