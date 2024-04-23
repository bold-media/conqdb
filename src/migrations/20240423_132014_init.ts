import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "_locales" AS ENUM('ar', 'cz', 'de', 'en', 'pl', 'ru', 'tr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_user_roles" AS ENUM('banned', 'user', 'member', 'maintainer', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_profile_unit_status" AS ENUM('training', 'ready', 'maxed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_weapon_type" AS ENUM('light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "user_roles" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_user_roles",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" varchar,
	"discord_username" varchar,
	"discord_discriminator" varchar,
	"discord_access_token" varchar,
	"discord_refresh_token" varchar,
	"discord_avatar" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "user_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"profile_id" integer
);

CREATE TABLE IF NOT EXISTS "profile_weapons" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"leadership" numeric
);

CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar,
	"level" numeric,
	"light_leadership" numeric,
	"medium_leadership" numeric,
	"heavy_leadership" numeric,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"blur_data_u_r_l" varchar,
	"prefix" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"sizes_blur_url" varchar,
	"sizes_blur_width" numeric,
	"sizes_blur_height" numeric,
	"sizes_blur_mime_type" varchar,
	"sizes_blur_filesize" numeric,
	"sizes_blur_filename" varchar,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar
);

CREATE TABLE IF NOT EXISTS "media_locales" (
	"alt" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "media_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "page_breadcrumbs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"url" varchar,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "page" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"pathname" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "page_locales" (
	"title" varchar,
	"full_title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"page_id" integer
);

CREATE TABLE IF NOT EXISTS "profile_unit" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" numeric NOT NULL,
	"status" "enum_profile_unit_status" NOT NULL,
	"unlocked_mastery_nodes" numeric,
	"favorite" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "profile_unit_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"profile_id" integer,
	"unit_id" integer
);

CREATE TABLE IF NOT EXISTS "unit_mastery_nodes" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" jsonb
);

CREATE TABLE IF NOT EXISTS "unit" (
	"id" serial PRIMARY KEY NOT NULL,
	"leadership" numeric NOT NULL,
	"stars" numeric NOT NULL,
	"max_level" numeric NOT NULL,
	"mastery_has_mastery" boolean,
	"attributes_health" numeric,
	"attributes_strength" numeric,
	"attributes_speed" numeric,
	"attributes_range" numeric,
	"attributes_ammo" numeric,
	"attributes_labour" numeric,
	"attributes_piercing_armour_penetration" numeric,
	"attributes_slashing_armour_penetration" numeric,
	"attributes_blunt_armour_penetration" numeric,
	"attributes_piercing_damage" numeric,
	"attributes_slashing_damage" numeric,
	"attributes_blunt_damage" numeric,
	"attributes_piercing_defence" numeric,
	"attributes_slashing_defence" numeric,
	"attributes_blunt_defence" numeric,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "unit_locales" (
	"name" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "unit_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "unit_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"unit_tag_id" integer,
	"unit_type_id" integer,
	"unit_category_id" integer,
	"unit_era_id" integer
);

CREATE TABLE IF NOT EXISTS "unit_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "unit_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"weight" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "unit_type_locales" (
	"name" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "unit_type_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "unit_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"weight" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "unit_category_locales" (
	"name" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "unit_category_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "unit_era" (
	"id" serial PRIMARY KEY NOT NULL,
	"weight" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "unit_era_locales" (
	"name" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "unit_era_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "weapon" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum_weapon_type",
	"weight" numeric,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "weapon_locales" (
	"name" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "weapon_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"user_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "user_roles_order_idx" ON "user_roles" ("order");
CREATE INDEX IF NOT EXISTS "user_roles_parent_idx" ON "user_roles" ("parent_id");
CREATE INDEX IF NOT EXISTS "user_discord_id_idx" ON "user" ("discord_id");
CREATE INDEX IF NOT EXISTS "user_discord_username_idx" ON "user" ("discord_username");
CREATE INDEX IF NOT EXISTS "user_created_at_idx" ON "user" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_idx" ON "user" ("email");
CREATE INDEX IF NOT EXISTS "user_rels_order_idx" ON "user_rels" ("order");
CREATE INDEX IF NOT EXISTS "user_rels_parent_idx" ON "user_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "user_rels_path_idx" ON "user_rels" ("path");
CREATE INDEX IF NOT EXISTS "profile_weapons_order_idx" ON "profile_weapons" ("_order");
CREATE INDEX IF NOT EXISTS "profile_weapons_parent_id_idx" ON "profile_weapons" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "profile_slug_idx" ON "profile" ("slug");
CREATE INDEX IF NOT EXISTS "profile_created_at_idx" ON "profile" ("created_at");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_blur_sizes_blur_filename_idx" ON "media" ("sizes_blur_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "page_breadcrumbs_order_idx" ON "page_breadcrumbs" ("_order");
CREATE INDEX IF NOT EXISTS "page_breadcrumbs_parent_id_idx" ON "page_breadcrumbs" ("_parent_id");
CREATE INDEX IF NOT EXISTS "page_breadcrumbs_locale_idx" ON "page_breadcrumbs" ("_locale");
CREATE UNIQUE INDEX IF NOT EXISTS "page_slug_idx" ON "page" ("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "page_pathname_idx" ON "page" ("pathname");
CREATE INDEX IF NOT EXISTS "page_created_at_idx" ON "page" ("created_at");
CREATE INDEX IF NOT EXISTS "page_rels_order_idx" ON "page_rels" ("order");
CREATE INDEX IF NOT EXISTS "page_rels_parent_idx" ON "page_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "page_rels_path_idx" ON "page_rels" ("path");
CREATE INDEX IF NOT EXISTS "profile_unit_created_at_idx" ON "profile_unit" ("created_at");
CREATE INDEX IF NOT EXISTS "profile_unit_rels_order_idx" ON "profile_unit_rels" ("order");
CREATE INDEX IF NOT EXISTS "profile_unit_rels_parent_idx" ON "profile_unit_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "profile_unit_rels_path_idx" ON "profile_unit_rels" ("path");
CREATE INDEX IF NOT EXISTS "unit_mastery_nodes_order_idx" ON "unit_mastery_nodes" ("_order");
CREATE INDEX IF NOT EXISTS "unit_mastery_nodes_parent_id_idx" ON "unit_mastery_nodes" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "unit_slug_idx" ON "unit" ("slug");
CREATE INDEX IF NOT EXISTS "unit_created_at_idx" ON "unit" ("created_at");
CREATE INDEX IF NOT EXISTS "unit_rels_order_idx" ON "unit_rels" ("order");
CREATE INDEX IF NOT EXISTS "unit_rels_parent_idx" ON "unit_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "unit_rels_path_idx" ON "unit_rels" ("path");
CREATE INDEX IF NOT EXISTS "unit_tag_created_at_idx" ON "unit_tag" ("created_at");
CREATE INDEX IF NOT EXISTS "unit_type_created_at_idx" ON "unit_type" ("created_at");
CREATE INDEX IF NOT EXISTS "unit_category_created_at_idx" ON "unit_category" ("created_at");
CREATE INDEX IF NOT EXISTS "unit_era_created_at_idx" ON "unit_era" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "weapon_slug_idx" ON "weapon" ("slug");
CREATE INDEX IF NOT EXISTS "weapon_created_at_idx" ON "weapon" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_parent_id_user_id_fk" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_rels" ADD CONSTRAINT "user_rels_parent_id_user_id_fk" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_rels" ADD CONSTRAINT "user_rels_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_weapons" ADD CONSTRAINT "profile_weapons__parent_id_profile_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales__parent_id_media_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_breadcrumbs" ADD CONSTRAINT "page_breadcrumbs__parent_id_page_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales__parent_id_page_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_parent_id_page_id_fk" FOREIGN KEY ("parent_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_unit_rels" ADD CONSTRAINT "profile_unit_rels_parent_id_profile_unit_id_fk" FOREIGN KEY ("parent_id") REFERENCES "profile_unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_unit_rels" ADD CONSTRAINT "profile_unit_rels_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_unit_rels" ADD CONSTRAINT "profile_unit_rels_unit_id_unit_id_fk" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_mastery_nodes" ADD CONSTRAINT "unit_mastery_nodes__parent_id_unit_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_locales" ADD CONSTRAINT "unit_locales__parent_id_unit_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_parent_id_unit_id_fk" FOREIGN KEY ("parent_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_tag_id_unit_tag_id_fk" FOREIGN KEY ("unit_tag_id") REFERENCES "unit_tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_type_id_unit_type_id_fk" FOREIGN KEY ("unit_type_id") REFERENCES "unit_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_category_id_unit_category_id_fk" FOREIGN KEY ("unit_category_id") REFERENCES "unit_category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_era_id_unit_era_id_fk" FOREIGN KEY ("unit_era_id") REFERENCES "unit_era"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_type_locales" ADD CONSTRAINT "unit_type_locales__parent_id_unit_type_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_category_locales" ADD CONSTRAINT "unit_category_locales__parent_id_unit_category_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit_category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_era_locales" ADD CONSTRAINT "unit_era_locales__parent_id_unit_era_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit_era"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "weapon_locales" ADD CONSTRAINT "weapon_locales__parent_id_weapon_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "weapon"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "user_roles";
DROP TABLE "user";
DROP TABLE "user_rels";
DROP TABLE "profile_weapons";
DROP TABLE "profile";
DROP TABLE "media";
DROP TABLE "media_locales";
DROP TABLE "page_breadcrumbs";
DROP TABLE "page";
DROP TABLE "page_locales";
DROP TABLE "page_rels";
DROP TABLE "profile_unit";
DROP TABLE "profile_unit_rels";
DROP TABLE "unit_mastery_nodes";
DROP TABLE "unit";
DROP TABLE "unit_locales";
DROP TABLE "unit_rels";
DROP TABLE "unit_tag";
DROP TABLE "unit_type";
DROP TABLE "unit_type_locales";
DROP TABLE "unit_category";
DROP TABLE "unit_category_locales";
DROP TABLE "unit_era";
DROP TABLE "unit_era_locales";
DROP TABLE "weapon";
DROP TABLE "weapon_locales";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
