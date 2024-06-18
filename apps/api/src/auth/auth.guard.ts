import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HEADERS, SERVICES } from '@app/utils/constants';
import { AuthService } from './auth.service';
import { SESSION_COOKIE_NAME } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(SERVICES.AUTH) private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers[HEADERS.API_KEY];

    const sessionId = request.cookies[SESSION_COOKIE_NAME];

    if (apiKey && apiKey === this.configService.get('ADMIN_API_KEY')) {
      request.user = {
        id: 'admin',
        isAdmin: true,
        apiKey,
      };
      return true;
    }

    if (sessionId) {
      const user = await this.authService.validateSession(sessionId);

      if (user) {
        request.user = user;
        return true;
      }
    } else if (apiKey) {
      const user = await this.authService.validateApiKey(apiKey);
      if (user) {
        request.user = user;
        return true;
      }
    }

    if (isPublic) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
