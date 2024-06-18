export enum ROUTES {
  CACHE = 'cache',
  AUTH = 'auth',
  SESSION = 'session',
  USER = 'user',
  PROFILE = 'profile',
  TRANSLATIONS = 'translations',
}

export enum SERVICES {
  CACHE = 'CACHE_SERVICE',
  DATABASE = 'DATABASE_SERVICE',
  AUTH = 'AUTH_SERVICE',
  SESSION = 'SESSION_SERVICE',
  USER = 'USER_SERVICE',
  PROFILE = 'PROFILE_SERVICE',
  TRANSLATIONS = 'TRANSLATIONS_SERVICE',
}

export enum CACHE_KEYS {
  SESSION = 'session',
  API_KEY = 'api-key',
  USER = 'user',
}

export enum HEADERS {
  API_KEY = 'x-api-key',
}

export const locales = ['en', 'ar', 'cz', 'de', 'pl', 'ru', 'tr'] as const;
