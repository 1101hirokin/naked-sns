<?php

namespace App\Models;

use App\Helper\Random;
use App\Helper\UnixTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class PostFileTying extends Model
{
    use HasFactory;

    protected $table = 'user_post_likings';
    public $incrementing = false;

    protected $primaryKey = 'id';
    protected $keyType = 'string';

    public $timestamps = false;

    protected $guarded = [];

    public static function readPostFileTying(string $id, array $collumns = ["*"]): object | null {
        try {
          $userPostLiking = self::query()->where('id', $id)->where("deleted_at", 0)->firstOrFail($collumns);
          return $userPostLiking;
        } catch (ModelNotFoundException $e) {
          return null;
        }
      }
    
      public static function readPostFileTyingBySpecifiedField(string $field, string $operator = "=", mixed $value, array $collumns = ["*"]): object | null {
        try {
          $userPostLiking = self::query()->where(
            column: $field,
            operator: $operator,
            value: $value,
          )->where("deleted_at", 0)->firstOrFail($collumns);
          return $userPostLiking;
        } catch (ModelNotFoundException $e) {
          return null;
        }
      }
    
      public static function createPostFileTying(
          string $fileID,
          string $postID,
          int $sort,
      ): object | null {
        $timestamp = UnixTime::getCurrentUnixTime();
        $newData = [
          "id" => Random::getString(16),
          "created_at" => $timestamp,
          "updated_at" => $timestamp,
          "file_id" => $fileID,
          "post_id" => $postID,
          "sort" => $sort,
        ];
  
        try {
          $result = self::query()->create($newData);
          return $result;
        } catch (QueryException $e) {
          echo $e->getMessage();
          return null;
        }
      }
    
      public static function updatePostFileTying(string $id, array $data): object | null {
        if (count($data) === 0) { return null; }
    
        $updateData = $data;
        unset($updateData["id"]);
        
        if (count($updateData) === 0) { return null; }
    
        $timestamp = UnixTime::getCurrentUnixTime();
        $updateData["updated_at"] = $timestamp;
    
        $result = self::query()->where("id", $id)->where("deleted_at", 0)->update($updateData);
        if ($result !== 1) { return null; }
    
        $updated = self::readPostFileTying($id);
    
        return $updated;
      }
    
      public static function deletePostFileTying(string $id, bool $force=false): bool {
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
