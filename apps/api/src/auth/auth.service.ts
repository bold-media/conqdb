import { InjectDatabase } from '@app/database/database.decorator';
import {
  InferredApiKey,
  apiKey as apiKeySchema,
} from '@app/database/schema/api-key.schema';
import { schema } from '@app/database/schema/index.schema';
import {
  InferredSession,
  session as sessionSchema,
} from '@app/database/schema/session.schema';
import { UserService } from '@app/user/user.service';
import { CACHE_KEYS, SERVICES } from '@app/utils/constants';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { and, eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import {
  AuthUser,
  UserWithSessionOrApiKey,
} from './interfaces/authUser.interface';
import { ConfigService } from '@nestjs/config';
import DiscordOAuth2, { TokenRequestResult } from 'discord-oauth2';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly discord: DiscordOAuth2;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(SERVICES.USER) private readonly userService: UserService,
    @InjectDatabase() private readonly db: PostgresJsDatabase<typeof schema>,
    private readonly configService: ConfigService,
  ) {
    this.discord = new DiscordOAuth2({
      clientId: this.configService.get('DISCORD_CLIENT_ID'),
      clientSecret: this.configService.get('DISCORD_CLIENT_SECRET'),
      redirectUri: `${this.configService.get('API_URL')}/auth/callback/discord`,
    });
  }

  async getDiscordLoginUrl() {
    const state = await this.generateOAuthState();
    const url = await this.discord.generateAuthUrl({
      scope: ['identify', 'guilds', 'guilds.members.read'],
      state,
      responseType: 'code',
    });

    return url;
  }

  async getDiscordTokens(code: string) {
    const tokens = await this.discord.tokenRequest({
      code,
      grantType: 'authorization_code',
      scope: ['identify', 'guilds', 'guilds.members.read'],
    });

    return tokens;
  }

  async getDiscordUserInfo(tokens: TokenRequestResult) {
    const discordUser = await this.discord.getUser(tokens.access_token);
    const now = Date.now();
    const expirationTime = now + tokens.expires_in * 1000;

    return {
      discordId: discordUser.id,
      discordUsername: discordUser.username,
      discordDiscriminator: discordUser.discriminator,
      discordAccessToken: tokens.access_token,
      discordRefreshToken: tokens.refresh_token,
      discordTokenExpiration: new Date(expirationTime),
      discordAvatar: discordUser.avatar,
    };
  }

  async createSession(userId: string) {
    try {
      const newSession = await this.db
        .insert(sessionSchema)
        .values({ userId })
        .returning();

      const session = newSession[0];

      await this.cacheManager.set(
        `${CACHE_KEYS.SESSION}:${newSession[0].id}`,
        session,
      );
      return session;
    } catch (error) {
      this.logger.error(`Error creating session: `, error);
      return null;
    }
  }

  async deleteSession(sessionId: string): Promise<string | null> {
    try {
      const deletedSession = await this.db
        .delete(sessionSchema)
        .where(eq(sessionSchema.id, sessionId))
        .returning({ id: sessionSchema.id });

      if (deletedSession.length > 0) {
        await this.cacheManager.del(`${CACHE_KEYS.SESSION}:${sessionId}`);
        return deletedSession[0].id;
      }

      return null;
    } catch (error) {
      this.logger.error(`Error deleting session: `, error);
      return null;
    }
  }

  async deleteUserSessions(userId: string): Promise<Array<string> | null> {
    try {
      const deletedSessions = await this.db
        .delete(sessionSchema)
        .where(eq(sessionSchema.userId, userId))
        .returning({ id: sessionSchema.id });

      if (deletedSessions.length > 0) {
        const sessionIds = deletedSessions.map((session) => session.id);

        await Promise.all(
          sessionIds.map((id) =>
            this.cacheManager.del(`${CACHE_KEYS.SESSION}:${id}`),
          ),
        );

        return sessionIds;
      }

      return [];
    } catch (error) {
      this.logger.error(`Error deleting sessions: `, error);
      return null;
    }
  }

  async updateSessionExpiration(
    sessionId: string,
    expiresAt: Date,
  ): Promise<boolean> {
    try {
      const result = await this.db
        .update(sessionSchema)
        .set({
          expiresAt,
        })
        .where(eq(sessionSchema.id, sessionId))
        .returning({ id: sessionSchema.id });

      return result.length > 0;
    } catch (error) {
      console.error(`Error updating session expiration: `, error);
      return false;
    }
  }

  async validateSession(sessionId: string): Promise<AuthUser | null> {
    let session = await this.getSession(sessionId);

    if (session) {
      const user = await this.userService.findById(session.userId);

      if (user) {
        return this.formatAuthUser({ user, session });
      }
    }

    return null;
  }

  async validateApiKey(id: string): Promise<AuthUser | null> {
    let apiKeyData = await this.getApiKey(id);

    if (apiKeyData) {
      const user = await this.userService.findById(apiKeyData.userId);

      if (user) {
        return this.formatAuthUser({ user, apiKey: apiKeyData });
      }
    }

    return null;
  }

  private async formatAuthUser({
    user,
    session,
    apiKey,
  }: UserWithSessionOrApiKey): Promise<AuthUser | null> {
    if (session) {
      return {
        ...user,
        session,
      };
    }

    if (apiKey) {
      return {
        ...user,
        apiKey,
      };
    }

    return null;
  }

  private async getSession(sessionId: string): Promise<InferredSession | null> {
    try {
      const cachedSession: InferredSession | null =
        await this.getCachedSession(sessionId);

      if (cachedSession && this.isValidSession(cachedSession)) {
        return cachedSession;
      } else if (cachedSession) {
        await this.cacheManager.del(`${CACHE_KEYS.SESSION}:${sessionId}`);
      }

      const session = await this.db.query.session.findFirst({
        where: eq(sessionSchema.id, sessionId),
      });

      if (session) {
        await this.cacheManager.set(
          `${CACHE_KEYS.SESSION}:${sessionId}`,
          session,
        );
        return session;
      } else {
        return null;
      }
    } catch (error) {
      this.logger.error(`Failed to get session`, error);
      return null;
    }
  }

  private async getApiKey(apiKey: string) {
    try {
      const cachedApiKey: InferredApiKey | null =
        await this.getCachedApiKey(apiKey);

      if (cachedApiKey) {
        return cachedApiKey;
      }

      const apiKeyData = await this.db.query.apiKey.findFirst({
        where: and(eq(apiKeySchema.id, apiKey), eq(apiKeySchema.active, true)),
      });

      if (apiKeyData) {
        await this.cacheManager.set(
          `${CACHE_KEYS.API_KEY}:${apiKey}`,
          apiKeyData,
          7200,
        );

        return apiKeyData;
      }

      return null;
    } catch (error) {
      this.logger.error('Failed to get API Key', error);
    }
  }

  private async getCachedSession(
    sessionId: string,
  ): Promise<InferredSession | null> {
    const cachedValue: InferredSession | null = await this.cacheManager.get(
      `${CACHE_KEYS.SESSION}:${sessionId}`,
    );

    return cachedValue || null;
  }

  private async isValidSession(session: InferredSession) {
    let expirationDate: Date;

    if (typeof session.expiresAt === 'string') {
      expirationDate = new Date(session.expiresAt);
    } else {
      expirationDate = session.expiresAt;
    }

    const currentUtcDate = new Date();

    return currentUtcDate < expirationDate;
  }

  private async getCachedApiKey(
    apiKey: string,
  ): Promise<InferredApiKey | null> {
    const cachedValue: InferredApiKey | null = await this.cacheManager.get(
      `${CACHE_KEYS.API_KEY}:${apiKey}`,
    );

    return cachedValue || null;
  }

  private async generateOAuthState(): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        resolve(buf.toString('hex'));
      });
    });
  }
}
