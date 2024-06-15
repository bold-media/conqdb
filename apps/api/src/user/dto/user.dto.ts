import { UserRole } from '@app/database/schema';
import { User } from '@conqdb/types/user';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class BaseUserDto implements User {
  @ApiProperty({
    description: 'Globally unique identifier of the user',
    example: '1234567890',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Discord ID of the user',
    example: '1234567890',
    required: false,
  })
  @IsString()
  discordId: string;

  @ApiProperty({
    description: 'Username of the user on Discord',
    example: 'JohnDoe',
    required: false,
  })
  @IsString()
  discordUsername: string;

  @ApiProperty({
    description: 'Discriminator of the user on Discord',
    example: '1234',
    required: false,
  })
  @IsString()
  discordDiscriminator: string;

  @ApiProperty({
    description: 'Access token for Discord',
    example: 'MzI1MzQ2MzU2NjI0ODE0MTgz.Yw6Qug.DmNfaFkf9wIjRWyG_0iF4nns3Eo',
    required: false,
  })
  @IsString()
  discordAccessToken: string;

  @ApiProperty({
    description: 'Refresh token for Discord',
    example: 'MTAzNTQ2MjU2MzUyNzQ2Mzgy.Xb6Qug.OWfNfaFkf9wIjRWyG_0iF4nns3Eo',
    required: false,
  })
  @IsString()
  discordRefreshToken: string;

  @ApiProperty({
    description: 'Expiration date of the Discord access token',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  discordTokenExpiration: Date;

  @ApiProperty({
    description: 'Avatar URL of the user on Discord',
    example: 'https://example.com/avatar.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  discordAvatar?: string;

  @ApiProperty({
    description: 'Roles assigned to the user',
    example: ['user'],
    required: false,
  })
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @ApiProperty({
    description: 'Indicates if the user is an admin',
    example: false,
    required: false,
  })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    description: 'Indicates if the user is banned',
    example: false,
    required: false,
  })
  @IsBoolean()
  isBanned: boolean;

  @ApiProperty({
    description: 'Languages the user can edit',
    example: ['en', 'es'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  editLanguages: string[];

  @ApiProperty({
    description: 'Date the user was created',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date the user was last updated',
    example: '2022-01-02T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  updatedAt: Date;
}
