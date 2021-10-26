<?php

namespace App\Helper;

class TypeChecker
{

  public static function isHasharray(mixed $target): bool {
    $i = 0;
    foreach($target as $k => $dummy) {
        if ( $k !== $i++ ) return true;
    }
    return false;
  }
}