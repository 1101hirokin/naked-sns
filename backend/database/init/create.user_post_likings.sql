CREATE TABLE "user_post_likings" (
  "id" TEXT NOT NULL,
  "created_at" INT NOT NULL DEFAULT 0,
  "updated_at" INT NOT NULL DEFAULT 0,
  "deleted_at" INT NOT NULL DEFAULT 0,

  "user_id" TEXT NOT NULL,
  "post_id" SMALLINT NOT NULL,

  UNIQUE("user_id", "post_id"),
  PRIMARY KEY("id")
);