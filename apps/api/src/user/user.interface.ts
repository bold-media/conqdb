import { InferredUser } from '@app/database/schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

import {
  Pagination,
  QueryStringPagination,
} from '@app/database/database.service';

export interface IUserInterface {
  find(
    args: QueryStringPagination<InferredUser>,
  ): Promise<{ data: InferredUser[]; pagination: Pagination }>;

  findByDiscordId(discordId: string): Promise<InferredUser | null>;

  findById(userId: string): Promise<InferredUser | null>;

  create(data: CreateUserDto): Promise<InferredUser>;

  update(id: string, data: UpdateUserDto): Promise<InferredUser>;

  delete(id: string): Promise<null>;
}
