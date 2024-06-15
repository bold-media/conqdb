import { boolean, pgTable, uuid } from 'drizzle-orm/pg-core';
import { sonyflakeId } from '../custom-types/sonyflakeId';
import { user } from './user.schema';
import { relations, sql } from 'drizzle-orm';

export type InferredApiKey = typeof apiKey.$inferSelect;

export const apiKey = pgTable('api_key', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  active: boolean('active').default(true).notNull(),
  userId: sonyflakeId('user_id')
    .notNull()
    .references(() => user.id),
});

export const apiKeyRelations = relations(apiKey, ({ one }) => ({
  user: one(user, {
    fields: [apiKey.userId],
    references: [user.id],
  }),
}));
