<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShaveUserInfo
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
        $res = $next($request);
        if($res->status() !== 200) { return $next($request); }
        
        $data = $res->getOriginalContent();
        if (is_null($data)) { return $res; }

        $decoded = json_decode(json_encode($data), true);

        if (array_values($decoded) === $decoded) {
            $decoded = (array) $decoded;
            for ($i=0;$i<count($decoded);$i++) {
               if (array_key_exists("email",  $decoded[$i]["data"]["email"])) {
                    $decoded[$i]["data"]["email"] = "";
               }
                unset($decoded[$i]["data"]["hashed_password"]);
            }

            $res->setData($decoded);
            return $res;
        }
        
        if (array_key_exists("email", $decoded["data"])) {
            $decoded["data"]["email"] = "";
        }
        unset($decoded["data"]["hashed_password"]);

        $res->setData($decoded);
        return $res;
    }
}
