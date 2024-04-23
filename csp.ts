const policies = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'child-src': ["'self'"],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://cdn.conqdb.com',
  ],
  'img-src': ["'self'", 'https://cdn.discordapp.com'],
  'font-src': ["'self'", 'https://cdn.conqdb.com'],
  'frame-src': ["'self'"],
  'connect-src': ["'self'"],
}

export default Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')
