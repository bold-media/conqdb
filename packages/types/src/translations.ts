export interface Translations {
  id: string;
  locale: string;
  messages: Messages;
  updatedAt: Date;
}

export interface Messages {
  navigation: {
    actions: {
      signIn: string;
      switchLanguage: string;
      toggleColorScheme: string;
    };
    menu: {
      notifications: string;
      profile: string;
      createProfile: string;
      createRaid: string;
      joinRaid: string;
      raidDashboard: string;
      translations: string;
      adminDashboard: string;
      signOut: string;
    };
  };
}
