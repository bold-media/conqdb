import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';
import { BaseUserDto } from './user.dto';
import { OmitType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';
import { UserRole } from '@app/database/schema';

// export class CreateUserDto extends OmitType(BaseUserDto, [
//   'id',
//   'createdAt',
//   'updatedAt',
// ] as const) {
//   @IsOptional()
//   discordDiscriminator?: string;
// }

// export class CreateUserDto extends OmitType(UserEntity, ['id', 'createdAt', 'updatedAt']) {
//   @IsString()
//   discordId: string;

//   @IsOptional()
//   @IsString()
//   discordUsername?: string;

//   @IsOptional()
//   @IsString()
//   discordDiscriminator?: string;

//   @IsOptional()
//   @IsString()
//   discordAccessToken?: string;

//   @IsOptional()
//   @IsString()
//   discordRefreshToken?: string;

//   @IsOptional()
//   @IsDate()
//   discordTokenExpiration?: Date;

//   @IsOptional()
//   @IsString()
//   discordAvatar?: string;

//   @IsOptional()
//   @IsArray()
//   @IsEnum(UserRole, { each: true })
//   roles?: UserRole[];

//   @IsOptional()
//   @IsBoolean()
//   isAdmin?: boolean;

//   @IsOptional()
//   @IsBoolean()
//   isBanned?: boolean;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   editLanguages?: string[];
// }

export class CreateUserDto extends PickType(UserEntity, [
  'discordId',
  'discordUsername',
  'discordDiscriminator',
  'discordAvatar',
  'discordAccessToken',
  'discordRefreshToken',
  'discordTokenExpiration',
] as const) {}
