CREATE TABLE IF NOT EXISTS "unit" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "unit_name_unique" UNIQUE("name")
);
