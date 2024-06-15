import { ROUTES, SERVICES } from '@app/utils/constants';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FastifyReply, FastifyRequest as BaseFastifyRequest } from 'fastify';
import { AUTH_REDIRECT_COOKIE_NAME, SESSION_COOKIE_NAME } from './constants';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@app/user/user.service';
import { FastifyRequest } from '@app/interfaces/request.interface';
import { Public } from './decorators/public.decorator';
import { sanitizeUser } from '@app/user/utils/sanitizeUser';

@ApiTags(ROUTES.AUTH.toUpperCase())
@Controller(ROUTES.AUTH)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: AuthService,
    @Inject(SERVICES.USER) private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get('/login/discord')
  async login(
    @Res() res: FastifyReply,
    @Query('redirect') redirect: string,
  ): Promise<void> {
    const url = await this.authService.getDiscordLoginUrl();

    if (url && redirect) {
      res.setCookie(AUTH_REDIRECT_COOKIE_NAME, redirect, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 1000 * 10, // 10 minutes
      });
    }

    res.redirect(302, url);
  }

  @Post('/logout')
  async logout(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const result = await this.authService.deleteSession(req.user?.session?.id);

    if (result) {
      res.clearCookie(SESSION_COOKIE_NAME);
      res.send({ success: true, message: 'Logout successful', id: result });
    } else {
      return res.status(400).send({ success: false, message: 'Logout failed' });
    }
  }

  @Get('/me')
  async me(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return res.status(200).send({ user: sanitizeUser(req.user) });
  }

  @Public()
  @Get('/callback/discord')
  async discordCallback(
    @Req() req: BaseFastifyRequest,
    @Res() res: FastifyReply,
    @Query('state') state: string,
    @Query('code') code: string,
  ): Promise<void> {
    const redirectUrl = req.cookies[AUTH_REDIRECT_COOKIE_NAME];

    if (redirectUrl) {
      res.clearCookie(AUTH_REDIRECT_COOKIE_NAME);
    }

    if (!code) {
      throw new HttpException('Invalid OAuth state', HttpStatus.BAD_REQUEST);
    }

    try {
      const tokens = await this.authService.getDiscordTokens(code);
      const discordUser = await this.authService.getDiscordUserInfo(tokens);

      let user = await this.userService.findByDiscordId(discordUser.discordId);

      if (!user) {
        user = await this.userService.create(discordUser);
      } else {
        user = await this.userService.update(user.id, discordUser);
      }

      const session = await this.authService.createSession(user.id);

      res.setCookie(SESSION_COOKIE_NAME, session.id, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 1000 * 60 * 24 * 30, // 30 days
      });

      return res.redirect(
        302,
        redirectUrl || this.configService.get('FRONTEND_URL'),
      );
    } catch (error) {
      this.logger.error(`Failed to handle Discord callback`, error);
      throw new HttpException(
        'Failed to handle Discord callback',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
