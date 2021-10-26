<?php

namespace App\Models;

use App\Helper\Random;
use App\Helper\UnixTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class File extends Model
{
    use HasFactory;

    protected $table = 'files';
    public $incrementing = false;

    protected $primaryKey = 'id';
    protected $keyType = 'string';

    public $timestamps = false;

    protected $guarded = [];

    public static function readFile(string $id, array $collumns = ["*"]): object | null {
        try {
          $file = self::query()->where('id', $id)->where("deleted_at", 0)->firstOrFail($collumns);
          return $file;
        } catch (ModelNotFoundException $e) {
          return null;
        }
      }
    
      public static function readFileBySpecifiedField(string $field, string $operator = "=", mixed $value, array $collumns = ["*"]): object | null {
        try {
          $file = self::query()->where(
            column: $field,
            operator: $operator,
            value: $value,
          )->where("deleted_at", 0)->firstOrFail($collumns);
          return $file;
        } catch (ModelNotFoundException $e) {
          return null;
        }
      }
    
      public static function createFile(
          string $url,
          string $uploaderUserID,
          int $fileType = 0,
      ): object | null {
        $timestamp = UnixTime::getCurrentUnixTime();
        $newData = [
          "id" => Random::getString(16),
          "created_at" => $timestamp,
          "updated_at" => $timestamp,
          "user_id_uploader" => $uploaderUserID,
          "url"=> $url,
          "file_type" => $fileType,
        ];
  
        try {
          $result = self::query()->create($newData);
          return $result;
        } catch (QueryException $e) {
          echo $e->getMessage();
          return null;
        }
      }
    
      public static function updateFile(string $id, array $data): object | null {
        if (count($data) === 0) { return null; }
    
        $updateData = $data;
        unset($updateData["id"]);
        
        if (count($updateData) === 0) { return null; }
    
        $timestamp = UnixTime::getCurrentUnixTime();
        $updateData["updated_at"] = $timestamp;
    
        $result = self::query()->where("id", $id)->where("deleted_at", 0)->update($updateData);
        if ($result !== 1) { return null; }
    
        $updated = self::readFile($id);
    
        return $updated;
      }
    
      public static function deleteFile(string $id, bool $force=false): bool {
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
