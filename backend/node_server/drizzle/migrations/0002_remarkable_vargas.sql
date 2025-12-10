CREATE TABLE "audit" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"audit_type" text NOT NULL,
	"input_text" text,
	"file_url" text,
	"status" text DEFAULT 'pending',
	"result" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refresh_token" varchar(500);