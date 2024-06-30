import {
  json,
  numeric,
  pgTable,
  primaryKey,
  smallint,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { sonyflakeId } from '../custom-types/sonyflakeId';
import { generateSonyflakeId } from '@app/utils/sonyflake';
import { relations } from 'drizzle-orm';

export type Unit = typeof unit.$inferSelect;

export const unit = pgTable('unit', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  keywords: json('keywords').default([]).notNull(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  thumbnail: varchar('thumbnail', { length: 256 }),
  thumbnailSettings: json('thumbnail_settings').default({}).notNull(),
  leadership: smallint('leadership').notNull(),
  stars: numeric('starts', { precision: 2, scale: 1 }).default('0.0').notNull(),
  maxLevel: smallint('max_level').notNull(),
  masteryNodes: json('mastery_nodes').default([]).notNull(),
  typeId: sonyflakeId('type_id')
    .notNull()
    .references(() => unitType.id),
  categoryId: sonyflakeId('category_id')
    .notNull()
    .references(() => unitCategory.id),
  eraId: sonyflakeId('era_id')
    .notNull()
    .references(() => unitEra.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});

export const unitRelations = relations(unit, ({ one, many }) => ({
  translations: many(unitTranslation),
  type: one(unitType, {
    fields: [unit.typeId],
    references: [unitType.id],
  }),
  category: one(unitCategory, {
    fields: [unit.categoryId],
    references: [unitCategory.id],
  }),
  era: one(unitEra, {
    fields: [unit.eraId],
    references: [unitEra.id],
  }),
}));

export const unitTranslation = pgTable(
  'unit_translation',
  {
    unitId: sonyflakeId('unit_id').references(() => unit.id, {
      onDelete: 'cascade',
    }),
    locale: varchar('locale', { length: 5 }),
    data: json('data').default({}).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.unitId, table.locale] }),
    };
  },
);

export const unitType = pgTable('unit_type', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  weight: smallint('weight').default(0).notNull(),
});

export const unitCategory = pgTable('unit_category', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  weight: smallint('weight').default(0).notNull(),
});

export const unitEra = pgTable('unit_era', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  gradient: json('gradient').default({}),
  weight: smallint('weight').default(0).notNull(),
});
