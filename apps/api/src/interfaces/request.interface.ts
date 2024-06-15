import { AuthUser } from '@app/auth/interfaces/authUser.interface';
import { FastifyRequest as BaseFastifyRequest } from 'fastify';

export interface FastifyRequest extends BaseFastifyRequest {
  user: AuthUser | null;
}
