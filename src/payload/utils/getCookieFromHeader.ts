export const getCookieFromHeader = (headers: Headers, cookieName: string) => {
  const cookiesString = headers.get("cookie") || "";
  const cookies = cookiesString?.split(";").map((cookie) => cookie.trim());
  const cookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));
  return cookie ? cookie.split("=")[1] : null;
};
