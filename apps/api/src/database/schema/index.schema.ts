import * as apiKeySchema from './api-key.schema';
import * as sessionSchema from './session.schema';
import * as unitSchema from './unit.schema';
import * as userSchema from './user.schema';

export const schema = {
  ...apiKeySchema,
  ...sessionSchema,
  ...unitSchema,
  ...userSchema,
};
