CREATE TABLE "files" (
  "id" TEXT NOT NULL,
  "created_at" INT NOT NULL DEFAULT 0,
  "updated_at" INT NOT NULL DEFAULT 0,
  "deleted_at" INT NOT NULL DEFAULT 0,

  "url" TEXT NOT NULL,
  "user_id_uploader" TEXT DEFAULT NULL,
  "file_type" SMALLINT NOT NULL DEFAULT 0,

  PRIMARY KEY("id")
);