import { InferredUser } from '@app/database/schema';
import { InferredApiKey } from '@app/database/schema/api-key.schema';
import { InferredSession } from '@app/database/schema/session.schema';

export type AuthUser = InferredUser & {} & (
    | { session: InferredSession; apiKey?: never }
    | { session?: never; apiKey: InferredApiKey }
  );

export type UserWithSession = {
  user: InferredUser;
  session: InferredSession;
  apiKey?: never;
};

export type UserWithApiKey = {
  user: InferredUser;
  session?: never;
  apiKey: InferredApiKey;
};

export type UserWithSessionOrApiKey = UserWithSession | UserWithApiKey;
