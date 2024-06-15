import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { user } from './user.schema';
import { relations, sql } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';
import { sonyflakeId } from '../custom-types/sonyflakeId';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoId = customAlphabet(alphabet, 24);

export type InferredSession = typeof session.$inferSelect;

export const session = pgTable('session', {
  id: varchar('id', { length: 24 })
    .$defaultFn(() => nanoId())
    .primaryKey(),
  expiresAt: timestamp('expires_at', { mode: 'date' })
    .default(sql`now() + INTERVAL '30 days'`)
    .notNull(),
  userId: sonyflakeId('user_id')
    .notNull()
    .references(() => user.id),
});

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));
