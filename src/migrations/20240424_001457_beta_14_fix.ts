import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_parent_id_user_id_fk";

ALTER TABLE "user_rels" DROP CONSTRAINT "user_rels_parent_id_user_id_fk";

ALTER TABLE "user_rels" DROP CONSTRAINT "user_rels_profile_id_profile_id_fk";

ALTER TABLE "profile_weapons" DROP CONSTRAINT "profile_weapons__parent_id_profile_id_fk";

ALTER TABLE "media_locales" DROP CONSTRAINT "media_locales__parent_id_media_id_fk";

ALTER TABLE "page_breadcrumbs" DROP CONSTRAINT "page_breadcrumbs__parent_id_page_id_fk";

ALTER TABLE "page_locales" DROP CONSTRAINT "page_locales__parent_id_page_id_fk";

ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_parent_id_page_id_fk";

ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_page_id_page_id_fk";

ALTER TABLE "profile_unit_rels" DROP CONSTRAINT "profile_unit_rels_parent_id_profile_unit_id_fk";

ALTER TABLE "profile_unit_rels" DROP CONSTRAINT "profile_unit_rels_profile_id_profile_id_fk";

ALTER TABLE "profile_unit_rels" DROP CONSTRAINT "profile_unit_rels_unit_id_unit_id_fk";

ALTER TABLE "unit_mastery_nodes" DROP CONSTRAINT "unit_mastery_nodes__parent_id_unit_id_fk";

ALTER TABLE "unit_locales" DROP CONSTRAINT "unit_locales__parent_id_unit_id_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_parent_id_unit_id_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_tag_id_unit_tag_id_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_type_id_unit_type_id_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_category_id_unit_category_id_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_era_id_unit_era_id_fk";

ALTER TABLE "unit_type_locales" DROP CONSTRAINT "unit_type_locales__parent_id_unit_type_id_fk";

ALTER TABLE "unit_category_locales" DROP CONSTRAINT "unit_category_locales__parent_id_unit_category_id_fk";

ALTER TABLE "unit_era_locales" DROP CONSTRAINT "unit_era_locales__parent_id_unit_era_id_fk";

ALTER TABLE "weapon_locales" DROP CONSTRAINT "weapon_locales__parent_id_weapon_id_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_user_id_user_id_fk";

DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_rels" ADD CONSTRAINT "user_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_rels" ADD CONSTRAINT "user_rels_profile_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_weapons" ADD CONSTRAINT "profile_weapons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_breadcrumbs" ADD CONSTRAINT "page_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_unit_rels" ADD CONSTRAINT "profile_unit_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "profile_unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_unit_rels" ADD CONSTRAINT "profile_unit_rels_profile_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_unit_rels" ADD CONSTRAINT "profile_unit_rels_unit_fk" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_mastery_nodes" ADD CONSTRAINT "unit_mastery_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_locales" ADD CONSTRAINT "unit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "unit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_tag_fk" FOREIGN KEY ("unit_tag_id") REFERENCES "unit_tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_type_fk" FOREIGN KEY ("unit_type_id") REFERENCES "unit_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_category_fk" FOREIGN KEY ("unit_category_id") REFERENCES "unit_category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_rels" ADD CONSTRAINT "unit_rels_unit_era_fk" FOREIGN KEY ("unit_era_id") REFERENCES "unit_era"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_type_locales" ADD CONSTRAINT "unit_type_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_category_locales" ADD CONSTRAINT "unit_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit_category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "unit_era_locales" ADD CONSTRAINT "unit_era_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "unit_era"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "weapon_locales" ADD CONSTRAINT "weapon_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "weapon"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_parent_fk";

ALTER TABLE "user_rels" DROP CONSTRAINT "user_rels_parent_fk";

ALTER TABLE "user_rels" DROP CONSTRAINT "user_rels_profile_fk";

ALTER TABLE "profile_weapons" DROP CONSTRAINT "profile_weapons_parent_id_fk";

ALTER TABLE "media_locales" DROP CONSTRAINT "media_locales_parent_id_fk";

ALTER TABLE "page_breadcrumbs" DROP CONSTRAINT "page_breadcrumbs_parent_id_fk";

ALTER TABLE "page_locales" DROP CONSTRAINT "page_locales_parent_id_fk";

ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_parent_fk";

ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_page_fk";

ALTER TABLE "profile_unit_rels" DROP CONSTRAINT "profile_unit_rels_parent_fk";

ALTER TABLE "profile_unit_rels" DROP CONSTRAINT "profile_unit_rels_profile_fk";

ALTER TABLE "profile_unit_rels" DROP CONSTRAINT "profile_unit_rels_unit_fk";

ALTER TABLE "unit_mastery_nodes" DROP CONSTRAINT "unit_mastery_nodes_parent_id_fk";

ALTER TABLE "unit_locales" DROP CONSTRAINT "unit_locales_parent_id_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_parent_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_tag_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_type_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_category_fk";

ALTER TABLE "unit_rels" DROP CONSTRAINT "unit_rels_unit_era_fk";

ALTER TABLE "unit_type_locales" DROP CONSTRAINT "unit_type_locales_parent_id_fk";

ALTER TABLE "unit_category_locales" DROP CONSTRAINT "unit_category_locales_parent_id_fk";

ALTER TABLE "unit_era_locales" DROP CONSTRAINT "unit_era_locales_parent_id_fk";

ALTER TABLE "weapon_locales" DROP CONSTRAINT "weapon_locales_parent_id_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_user_fk";

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
