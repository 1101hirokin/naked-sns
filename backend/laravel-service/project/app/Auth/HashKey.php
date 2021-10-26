<?php

namespace App\Auth;

// these keys should not be defined in the source code.
class HashKey
{ 
  private static $userPasswordKey = "userpassword";

  public static function getUserPasswordKey():string {
    return self::$userPasswordKey;
  }

  private static $userJWTKey = "userpassword";
  public static function getUserJWTKey(): string {
    return self::$userJWTKey;
  }
}