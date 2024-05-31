import { bigint, pgTable, varchar } from "drizzle-orm/pg-core";

export type Unit = typeof unit.$inferSelect;

export const unit = pgTable('unit', {
    id: bigint('id', { mode: 'bigint'}).primaryKey(),
    name: varchar('name', { length: 256 }).notNull().unique()
})