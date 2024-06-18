import {
  boolean,
  index,
  json,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { sonyflakeId } from '../custom-types/sonyflakeId';
import { generateSonyflakeId } from '@app/utils/sonyflake';
import { relations } from 'drizzle-orm';
import { profile } from './profile.schema';

export type InferredTranslations = typeof translations.$inferSelect;

export const translations = pgTable(
  'translations',
  {
    id: sonyflakeId('id')
      .$default(() => generateSonyflakeId())
      .primaryKey(),
    locale: varchar('locale', { length: 5 }).notNull().unique(),
    messages: json('messages').default({}),
    updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => {
    return {
      localeIdx: index('locale_idx').on(table.locale),
    };
  },
);

export const translationSubmissions = pgTable('translation_submissions', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  locale: varchar('locale', { length: 5 }).notNull(),
  partialMessages: json('partial_messages').default({}),
  reviewed: boolean('reviewed').default(false).notNull(),
  approved: boolean('approved').default(false).notNull(),
  submittedBy: sonyflakeId('submitted_by')
    .notNull()
    .references(() => profile.id),
  approvedBy: sonyflakeId('approved_by').references(() => profile.id),
  approvedAt: timestamp('approved_at').default(null),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});

export const translationSubmissionRelations = relations(
  translationSubmissions,
  ({ one }) => ({
    submittedBy: one(profile, {
      fields: [translationSubmissions.submittedBy],
      references: [profile.id],
    }),
    approvedBy: one(profile, {
      fields: [translationSubmissions.approvedBy],
      references: [profile.id],
    }),
  }),
);

//TODO: create the translation model + service to merge translations from different locales in to english
