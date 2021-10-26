<?php

namespace App\Helper;

class UnixTime
{
  public static function getCurrentUnixTime(): int {
    return time();
  }
}