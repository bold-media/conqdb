export const sanitizeUser = (user: any) => {
  const {
    discordAccessToken,
    discordRefreshToken,
    discordTokenExpiration,
    sessions,
    apiKeys,
    ...sanitizedUser
  } = user;
  return sanitizedUser;
};
