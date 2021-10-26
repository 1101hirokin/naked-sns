CREATE TABLE "user_followings" (
  "id" TEXT NOT NULL,
  "created_at" INT NOT NULL DEFAULT 0,
  "updated_at" INT NOT NULL DEFAULT 0,
  "deleted_at" INT NOT NULL DEFAULT 0,

  "user_id_follower" TEXT NOT NULL,
  "user_id_followee" TEXT NOT NULL,

  UNIQUE("user_id_follower", "user_id_followee"),
  PRIMARY KEY("id")
);