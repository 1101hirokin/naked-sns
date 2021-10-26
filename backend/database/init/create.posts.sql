CREATE TABLE "posts" (
  "id" TEXT NOT NULL,
  "created_at" INT NOT NULL DEFAULT 0,
  "updated_at" INT NOT NULL DEFAULT 0,
  "deleted_at" INT NOT NULL DEFAULT 0,

  "user_id_poster" TEXT NOT NULL,
  "body" TEXT NOT NULL,

  PRIMARY KEY("id")
);