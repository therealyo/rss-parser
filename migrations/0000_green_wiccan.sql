CREATE TABLE IF NOT EXISTS "posts" (
	"guid" varchar PRIMARY KEY NOT NULL,
	"creator" varchar(100),
	"link" varchar(256),
	"pub_date" timestamp(6) with time zone,
	"content" text,
	"content_snippet" text,
	"categories" jsonb,
	"deleted" boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS creator_idx ON posts ("creator");
CREATE INDEX IF NOT EXISTS categories_idx ON posts ("categories");