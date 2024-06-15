export const sanitizeUser = (user: any) => {
  const {
    discordAccessToken,
    discordRefreshToken,
    discordTokenExpiration,
    session,
    apiKey,
    ...sanitizedUser
  } = user;
  return sanitizedUser;
};
