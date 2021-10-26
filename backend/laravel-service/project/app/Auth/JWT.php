<?php

namespace App\Auth;

use App\Helper\Hasher;
use App\Helper\UnixTime;

class JWT
{

  private static string $issuer = "com.naked-sns.api";

  private static function _getHeader(): array {
    return [
      "alg" => "HS256",
      "typ" => "JWT"
    ];
  }

  private static function _getPayload(
    string $userID = "",
    string $subject = "",
  ): array {
    $timestamp = UnixTime::getCurrentUnixTime();

    return [
      "iss" => self::$issuer,
      "iat" => $timestamp,
      "nbf" => $timestamp,
      "sub" => $subject,
      "exp" => $timestamp + (60*60*24*365),
      "uid" => $userID,
    ];
  }

  private static string $_userAuthSubject = "userauth";
  public static function getUserToken(string $userID): string | false {
    $header = self::_getHeader();
    $payload = self::_getPayload(
      userID: $userID,
      subject: self::$_userAuthSubject,
    );

    $h_json_stringified = json_encode($header);
    $p_json_stringified = json_encode($payload);

    if (!$h_json_stringified || !$p_json_stringified) { return false; }

    $h_b64_encoded = str_replace(
      subject: base64_encode($h_json_stringified),
      search: "=",
      replace: "",
    );
    $p_b64_encoded =str_replace(
      subject: base64_encode($p_json_stringified),
      search: "=",
      replace: "",
    );;

    $unsigned_token = $h_b64_encoded.".".$p_b64_encoded;
    
    $sign = Hasher::hashString(
      raw: $unsigned_token,
      key: HashKey::getUserJWTKey(),
    );

    $signed_token = $unsigned_token.".".$sign;

    return $signed_token;
  }

  // returns error message and payload
  public static function checkJWT(string $jwt): array {

    function getReturnValue(
      ?string $msg = "", mixed $payload = null,
    ): array {
      return [
        "error_message"=> $msg,
        "payload" => $payload,
      ];
    }

    $splitted = explode(
      separator: ".",
      string: $jwt,
    );

    if (count($splitted) !== 3) {
      return getReturnValue(msg: "invalid syntax");
    }

    $h_b64_encoded = $splitted[0];
    $p_b64_encoded = $splitted[1];
    $sign = $splitted[2];

    $unsigned_token = $h_b64_encoded.".".$p_b64_encoded;

    if(!Hasher::compare(
      raw: $unsigned_token,
      hashed: $sign,
      key: HashKey::getUserJWTKey(),
    )) {
      return getReturnValue(msg: "invalid signature");
    }

    // $h_json_stringified = base64_decode($h_b64_encoded);

    $p_json_stringified = base64_decode($p_b64_encoded);

    $payload = json_decode($p_json_stringified);
    $current = UnixTime::getCurrentUnixTime();
    
    $iat = (int) $payload->iat;
    if ($current < $iat) { return getReturnValue(msg: "This JWT shouldn't exist"); }

    $exp = (int) $payload->exp;
    if ($exp < $current) { return getReturnValue(msg: "This JWT is expired."); }

    return getReturnValue(
      msg: null,
      payload: $payload,
    );
  }
}