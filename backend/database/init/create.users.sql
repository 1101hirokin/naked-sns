CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "created_at" INT NOT NULL DEFAULT 0,
  "updated_at" INT NOT NULL DEFAULT 0,
  "deleted_at" INT NOT NULL DEFAULT 0,

  "screen_id" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  -- "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
  -- "email_unverified_at" INT NOT NULL DEFAULT 0,
  "hashed_password" TEXT NOT NULL,
  "name" TEXT NOT NULL DEFAULT '',
  "bio" TEXT NOT NULL DEFAULT '',
  "file_id_avatar" TEXT DEFAULT NULL,

  PRIMARY KEY("id")
);