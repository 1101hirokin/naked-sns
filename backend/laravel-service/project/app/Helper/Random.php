<?php

namespace App\Helper;

class Random
{
  private static $source = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  public static function getString(int $length): string {
    $sourceLength = strlen(self::$source);
    $result = '';

    for ($i=0; $i<$length; $i++) {
      $result .= self::$source[self::getInt(0, $sourceLength-1)];
    }

    return $result;
  }

  public static function getInt(int $min, int $max): int {
    return rand($min, $max);
  }
}