<?php

namespace App\Http\Middleware;

use App\Auth\JWT;
use App\Helper\Castable;
use App\Helper\Format;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureJWTIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {   

        $authorizationHeader = $request->header("Authorization");
        if (!Castable::toString($authorizationHeader)) {
            $res = Format::forHTTPResponse(errorMessage: "invalid 'Authorization' HTTP Header");
            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        $h = (string) $authorizationHeader;
        if ($h === "") {
            $res = Format::forHTTPResponse(errorMessage: "'Authorization' HTTP Header must be set");
            return response()->json(
                data: $res,
                status: Response::HTTP_BAD_REQUEST,
            );
        }

        $jwt = preg_replace(
            pattern: '/Bearer( *)/i',
            subject: $h,
            replacement: "",
        );

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
        $myID = (string) $payload->uid;

        $me = User::readUser($myID);
        if (is_null($me)) {
            $res = Format::forHTTPResponse(null, "your user not found");
            return response()->json(
                data: $res,
                status: Response::HTTP_UNAUTHORIZED,
            );
        }

        $request->merge([
            "me" => $me,
        ]);

        return $next($request);
    }
}
