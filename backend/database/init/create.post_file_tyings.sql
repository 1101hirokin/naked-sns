CREATE TABLE "post_file_tyings" (
  "id" TEXT NOT NULL,
  "created_at" INT NOT NULL DEFAULT 0,
  "updated_at" INT NOT NULL DEFAULT 0,
  "deleted_at" INT NOT NULL DEFAULT 0,

  "post_id" TEXT NOT NULL,
  "file_id" TEXT NOT NULL,
  "sort" SMALLINT NOT NULL,

  UNIQUE("post_id", "file_id"),
  PRIMARY KEY("id")
);