import { ApiProperty } from "@nestjs/swagger";

export class CacheKeysResponseDto {
    @ApiProperty({
        type: [String],
        description: 'Array of cache keys',
        example: ['example-key-1', 'example-key-2', 'example-key-3'],
    })
    keys: string[];

    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 200 })
    statusCode: number
}

export class CacheKeysResetResponseDto {
    @ApiProperty({
        type: [String],
        description: 'Array of cache keys',
        example: []
    })
    keys: string[];
    
    @ApiProperty({example: true})
    success: boolean;

    @ApiProperty({ example: 200 })
    statusCode: number
}