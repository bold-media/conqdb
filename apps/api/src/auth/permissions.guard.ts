import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { FastifyRequest } from '@app/interfaces/request.interface';
import {
  PERMISSIONS_KEY,
  PermissionsOptions,
} from './decorators/permissions.decorator';
import { UserRole } from '@conqdb/types/user';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<PermissionsOptions>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!permissions) {
      return true; // No permissions required
    }

    const req: FastifyRequest = context.switchToHttp().getRequest();
    const user = req.user;

    if (user.isBanned) {
      throw new ForbiddenException('Your account has been banned.');
    }

    if (user.isAdmin) {
      return true; // Admins have all permissions
    }

    if (
      permissions.roles &&
      !this.userHasRequiredRole(user.roles, permissions.roles)
    ) {
      throw new ForbiddenException('You do not have the necessary role.');
    }

    return true;
  }

  private userHasRequiredRole(
    userRoles: UserRole[],
    requiredRoles: UserRole[],
  ): boolean {
    return userRoles.some((role) => requiredRoles.includes(role));
  }
}
