export interface Profile {
  id: string;
  userId: string;
  username: string;
  previousUsernames: string[];
  slug: string;
  level?: number | null;
  lightLeadership?: number | null;
  mediumLeadership?: number | null;
  heavyLeadership?: number | null;
  createdAt: Date;
  updatedAt: Date;
}
