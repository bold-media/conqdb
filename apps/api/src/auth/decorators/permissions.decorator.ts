import { UserRole } from '@conqdb/types/user';
import { SetMetadata } from '@nestjs/common';

export interface PermissionsOptions {
  roles?: UserRole[];
  lockTranslationsByLocale?: boolean;
}

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (options: PermissionsOptions) =>
  SetMetadata(PERMISSIONS_KEY, options);
