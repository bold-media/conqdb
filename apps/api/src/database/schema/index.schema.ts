import * as apiKeySchema from './api-key.schema';
import * as profileSchema from './profile.schema';
import * as sessionSchema from './session.schema';
import * as translationsSchema from './translations.schema';
import * as unitSchema from './unit.schema';
import * as userSchema from './user.schema';

export const schema = {
  ...apiKeySchema,
  ...profileSchema,
  ...sessionSchema,
  ...translationsSchema,
  ...unitSchema,
  ...userSchema,
};
