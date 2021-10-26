<?php

namespace App\Helper;

class Castable
{

  public static function toString(mixed $target): bool {
    return ( 
      !is_array( $target ) ) &&
      ( 
        (
          !is_object( $target ) &&
          settype( $target, 'string' ) !== false
        ) || 
        (
          is_object( $target ) &&
          method_exists( $target, '__toString'
        )
      )
    );
  }
  public static function toInt(mixed $target): bool {
    return is_numeric($target);
  }
}