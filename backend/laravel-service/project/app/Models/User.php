<?php

namespace App\Models;

use App\Auth\HashKey;
use App\Helper\Hasher;
use App\Helper\Random;
use App\Helper\UnixTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class User extends Model
{
  use HasFactory;

  protected $table = 'users';
  public $incrementing = false;

  protected $primaryKey = 'id';
  protected $keyType = 'string';

  public $timestamps = false;

  protected $guarded = [];

  public static function readUser(string $id, array $collumns = ["*"]): object | null {
    try {
      $user = self::query()->where('id', $id)->where("deleted_at", 0)->firstOrFail($collumns);
      return $user;
    } catch (ModelNotFoundException $e) {
      return null;
    }
  }

  public static function readUserBySpecifiedField(string $field, string $operator = "=", mixed $value, array $collumns = ["*"]): object | null {
    try {
      $user = self::query()->where(
        column: $field,
        operator: $operator,
        value: $value,
      )->where("deleted_at", 0)->firstOrFail($collumns);
      return $user;
    } catch (ModelNotFoundException $e) {
      return null;
    }
  }

  public static function createUser(
      string $email,
      string $screenID,
      string $rawPassword,
      string $name,
      string $bio = "",
      string $avatarFileID = null,
  ): object {
      $timestamp = UnixTime::getCurrentUnixTime();

      $hashedPass = Hasher::hashString(
        raw: $rawPassword,
        key: HashKey::getUserPasswordKey(),
      );

      $newData = [
          "id" => Random::getString(16),
          "created_at" => $timestamp,
          "updated_at" => $timestamp,
          "screen_id" => $screenID,
          "email" => $email,
          "name" => $name,
          "bio" => $bio,
          "file_id_avatar" => $avatarFileID,
          "hashed_password" => $hashedPass,
      ];

      try {
        $result = self::query()->create($newData);
        return $result;
      } catch (QueryException $e) {
        return null;
      }
  }

  public static function updateUser(string $id, array $data): object | null {
    if (count($data) === 0) { return null; }

    $updateData = $data;
    unset($updateData["id"]);

    if (array_key_exists("raw_password", $updateData) && is_string($updateData["raw_password"])) {
      $raw = (string) $updateData["raw_password"];

      $updateData["hashed_password"] = Hasher::hashString(
        raw: $raw,
        key: HashKey::getUserPasswordKey(),
      );
    }

    if (array_key_exists("email", $updateData)) {
      // email reset operations
    }
    
    if (count($updateData) === 0) { return null; }

    $timestamp = UnixTime::getCurrentUnixTime();
    $updateData["updated_at"] = $timestamp;

    $result = self::query()->where("id", $id)->where("deleted_at", 0)->update($updateData);
    if ($result !== 1) { return null; }

    $updated = self::readUser($id);

    return $updated;
  }

  public static function deleteUser(string $id, bool $force=false): bool {
    try {
      $target = self::query()->where("id", $id)->where("deleted_at", 0)->firstOrFail();
      if ($force) {
        $deletedCount = $target->delete();

        $result = ($deletedCount !== 0);
        return $result;
      } else {
        $target->deleted_at = UnixTime::getCurrentUnixTime();
        $result = $target->save();
        return $result;
      }

    } catch (ModelNotFoundException $e) { return false; }
  }
}
