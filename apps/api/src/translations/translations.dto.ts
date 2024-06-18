import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NavigationActions {
  @IsString()
  signIn: string = '';

  @IsString()
  switchLanguage: string = '';

  @IsString()
  toggleColorScheme: string = '';
}

class NavigationMenu {
  @IsString()
  notifications: string = '';

  @IsString()
  profile: string = '';

  @IsString()
  createProfile: string = '';

  @IsString()
  createRaid: string = '';

  @IsString()
  joinRaid: string = '';

  @IsString()
  raidDashboard: string = '';

  @IsString()
  translations: string = '';

  @IsString()
  adminDashboard: string = '';

  @IsString()
  signOut: string = '';
}

class Navigation {
  @ValidateNested()
  @Type(() => NavigationActions)
  actions: NavigationActions = new NavigationActions();

  @ValidateNested()
  @Type(() => NavigationMenu)
  menu: NavigationMenu = new NavigationMenu();
}

export class Messages {
  @ValidateNested()
  @Type(() => Navigation)
  navigation: Navigation = new Navigation();
}

export class Translations {
  id: string;
  locale: string;
  messages: Messages;
  updatedAt: Date;
}

export class CreateTranslationSubmissionDto {
  @ValidateNested()
  @Type(() => Messages)
  partialMessages: Partial<Messages>;
}
