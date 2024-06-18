import { InjectDatabase } from '@app/database/database.decorator';
import { user as userSchema, InferredUser } from '@app/database/schema';
import { schema } from '@app/database/schema/index.schema';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { IUserInterface } from './user.interface';
import { CACHE_KEYS, SERVICES } from '@app/utils/constants';
import {
  DatabaseService,
  Pagination,
  QueryStringPagination,
} from '@app/database/database.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService implements IUserInterface {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectDatabase() private readonly db: PostgresJsDatabase<typeof schema>,
    @Inject(SERVICES.DATABASE) private dbService: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async find({
    page = 1,
    limit = 10,
    sortField = 'id',
    sortOrder = 'asc',
    filters,
  }: QueryStringPagination<InferredUser>): Promise<{
    data: InferredUser[];
    pagination: Pagination;
  }> {
    return this.dbService.paginateQuery({
      schema: userSchema,
      queryStringPagination: {
        page,
        limit,
        sortField,
        sortOrder,
        filters,
      },
    });
  }

  async findByDiscordId(discordId: string): Promise<InferredUser | null> {
    const user = await this.db.query.user.findFirst({
      where: eq(userSchema.discordId, discordId),
    });

    return user || null;
  }

  async findById(userId: string): Promise<InferredUser | null> {
    const cachedUser = await this.getCachedUser(userId);

    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.db.query.user.findFirst({
      where: eq(userSchema.id, userId),
      with: {
        profile: true,
      },
    });

    if (user) {
      await this.cacheManager.set(
        `${CACHE_KEYS.USER}:${userId}`,
        JSON.stringify(user),
        7200,
      );
    }

    return user || null;
  }

  async getCachedUser(userId: string): Promise<InferredUser | null> {
    const cachedValue: string | null = await this.cacheManager.get(
      `${CACHE_KEYS.USER}:${userId}`,
    );

    if (!cachedValue) {
      return null;
    }

    try {
      const parsedValue = JSON.parse(cachedValue) as InferredUser;
      return parsedValue;
    } catch (error) {
      this.logger.error('Error parsing cached user:', error);
      return null;
    }
  }

  async create(data: CreateUserDto): Promise<InferredUser | null> {
    const user = await this.db.insert(userSchema).values(data).returning();

    return user[0] || null;
  }

  async update(id: string, data: UpdateUserDto): Promise<InferredUser> {
    try {
      const user = await this.db
        .update(userSchema)
        .set(data)
        .where(eq(userSchema.id, id))
        .returning();

      return user[0];
    } catch (error) {
      this.logger.error(`Failed to update user`, error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async delete(id: string): Promise<null> {
    await this.db.delete(userSchema).where(eq(userSchema.id, id));
    return null;
  }
}
