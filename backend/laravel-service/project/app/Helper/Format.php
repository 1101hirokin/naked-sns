<?php

namespace App\Helper;

class Format
{

  public static function forHTTPResponse(mixed $data = null, string | null $errorMessage = null) {
    return [
        "data" => $data,
        "error_message" => $errorMessage,
    ];
  }
}