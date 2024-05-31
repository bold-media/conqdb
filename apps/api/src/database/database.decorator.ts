import { Inject } from '@nestjs/common';

export const DATABASE_CONNECTION_KEY = 'POSTGRES_URL';

export function InjectDatabase() {
  return Inject(DATABASE_CONNECTION_KEY);
}