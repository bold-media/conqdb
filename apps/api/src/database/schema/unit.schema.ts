import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';
import { sonyflakeId } from '../custom-types/sonyflakeId';
import { generateSonyflakeId } from '@app/utils/sonyflake';

export type Unit = typeof unit.$inferSelect;

export const unit = pgTable('unit', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
});
