import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UpdateUserDto extends PartialType(
  OmitType(UserEntity, ['id', 'createdAt', 'updatedAt'] as const),
) {}
