import { Profile } from "./profile";

export interface User {
  id: string;
  profileId?: string;
  profile?: Profile;
  discordId: string;
  discordUsername: string;
  discordDiscriminator?: string;
  discordAccessToken: string;
  discordRefreshToken: string;
  discordTokenExpiration: Date;
  discordAvatar?: string;
  roles: UserRole[];
  isAdmin: boolean;
  isBanned: boolean;
  editLanguages: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  MANAGER = "manager",
  MAINTAINER = "maintainer",
  AUTHOR = "author",
  TRANSLATOR = "translator",
  MEMBER = "member",
  USER = "user",
}

export type CreateUserDto = Partial<
  Omit<User, "id" | "isBanned" | "createdAt" | "updatedAt">
>;

export type UpdateUserDto = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt">
>;

export type SanitizedUser = Omit<
  User,
  "discordAccessToken" | "discordRefreshToken" | "discordTokenExpiration"
>;
