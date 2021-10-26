<?php

namespace App\Helper;

use Illuminate\Support\Facades\Log;

class Hasher
{

  protected static string $algo = 'sha256';

  public static function hashString(string $raw, string $key): string {
    return hash_hmac(
      algo: self::$algo,
      data: $raw,
      key: $key,
      binary: false
    );
  }

  public static function compare(string $raw, string $hashed, string $key): bool {

    $hashed_raw = self::hashString(
      raw: $raw,
      key: $key,
    );

    return ($hashed === $hashed_raw);
  }
}