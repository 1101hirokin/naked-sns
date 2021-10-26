<?php

namespace App\Http\Controllers;

use App\Auth\HashKey;
use App\Auth\JWT;
use App\Helper\Castable;
use App\Helper\Format;
use App\Helper\Hasher;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{  

    public static function getFormattedLoginHasharray(string $token, mixed $me): array {
        return [
            "token" => $token,
            "me" => $me,
        ];
    }

    public function login(Request $request) {
        $rawPass = $request->input("password");
        $email = $request->input("email");

        if(!Castable::toString($rawPass) || !Castable::toString($email)) {
            $d = self::getFormattedLoginHasharray(token: "", me: null);
            $res = Format::forHTTPResponse($d, "invalid request format");

            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        if(($rawPass === "") || ($email === "")) {
            $d = self::getFormattedLoginHasharray(token: "", me: null);
            $res = Format::forHTTPResponse($d, "fields 'password' and 'email' are required");

            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        $u = User::readUserBySpecifiedField(field: "email", value:$email);
        if (is_null($u)) {
            $d = self::getFormattedLoginHasharray(token: "", me: null);
            $res = Format::forHTTPResponse($d, "user having the email was not found");
            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        if (!Hasher::compare(
            raw: $rawPass,
            hashed: $u->hashed_password,
            key: HashKey::getUserJWTKey(),
        )) {
            $d = self::getFormattedLoginHasharray(token: "", me: null);
            $res = Format::forHTTPResponse($d, "fail to login");

            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        $t = JWT::getUserToken($u->id);
        if (!$t) {
            $d = self::getFormattedLoginHasharray(token: "", me: null);
            $res = Format::forHTTPResponse($d, "jwt generating failed");

            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        $d = self::getFormattedLoginHasharray(
            token: $t,
            me: $u,
        );
        $res = Format::forHTTPResponse( data: $d );

        return response()->json(
            data: $res,
            status: Response::HTTP_OK,
        );
    }

    public function hash(Request $request, string $target) {
        $hashed = Hasher::hashString(
            raw: $target,
            key: HashKey::getUserJWTKey(),
        );

        $res = Format::forHTTPResponse(data: [
            "hashed" => $hashed,
        ]);

        return response()->json(
            data: $res,
            status: Response::HTTP_OK,
        );
    }

    public function checkJWT(Request $request) {
        $jwt = $request->input("jwt");
        if(!Castable::toString($jwt)) {
            $res = Format::forHTTPResponse(null, "invalid request format");

            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        if($jwt === "") {
            $res = Format::forHTTPResponse(null, "field 'jwt' is required");

            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        $checkResult = JWT::checkJWT($jwt);

        $msg =  $checkResult["error_message"];
        
        if (!is_null($msg)) {
            $res = Format::forHTTPResponse(null, $msg);

            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        $payload = $checkResult["payload"];

        $res = Format::forHTTPResponse(data: $payload);

        return response()->json(
            data: $res,
            status: Response::HTTP_OK,
        );
    }
}
