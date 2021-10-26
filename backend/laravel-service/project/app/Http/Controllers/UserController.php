<?php

namespace App\Http\Controllers;

use App\Helper\Castable;
use App\Helper\Format;
use App\Helper\UnixTime;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    
    public function get(Request $request, $id) {
        $userID = (string) $id;

        $user = User::readUser($userID);

        if (is_null($user)) {
            $res = Format::forHTTPResponse(errorMessage: "user not found");

            return response()->json(
                data: $res,
                status: Response::HTTP_NOT_FOUND,
            );
        }

        $res = Format::forHTTPResponse($user);

        return response()->json(
            data: $res,
            status: Response::HTTP_OK,
        );
    }

    public function getIndex(Request $request) {
        $s = $request->since;
        $since = Castable::toInt($s)? (int) $s: 0;

        $u = $request->until;
        $until = Castable::toInt($u)? (int) $u: UnixTime::getCurrentUnixTime();

        $f = $request->force;
        $force = boolval($f);

        $l = $request->limit;
        $limit = Castable::toInt($l)? (int) $l: 5;

        $q =DB::table('users')->where(column: "deleted_at", operator:"=", value: 0);
        if(!$force) {
            $q->
                where(column: "updated_at", operator: ">=", value: $since)->
                where(column: "updated_at", operator: "<", value: $until);
        }

        $users = $q->limit($limit)->orderBy("updated_at", "desc")->get();

        $res = Format::forHTTPResponse(data: $users);

        return response()->json(data: $res, status: Response::HTTP_OK);
    }

    public function updateMe(Request $request) {
        $me = $request->me;
        if (is_null($me)) { response()->json(status: Response::HTTP_UNAUTHORIZED); }

        $updateData = $request->all();
        unset($updateData["me"]);

        $result = User::updateUser($me->id, $updateData);
        if (is_null($result)) {
            $res = Format::forHTTPResponse(null, "updating failed");
            return response()->json(data: $res, status: Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $res = Format::forHTTPResponse(data: $result);
        return response()->json(data: $res, status: Response::HTTP_OK);
    }

    public function getMe(Request $request) {
        $me = $request->me;

        $res = Format::forHTTPResponse($me, "");
        $status = is_null($me)? Response::HTTP_UNAUTHORIZED: Response::HTTP_OK;

        return response()->json(data: $res, status: $status);
    }
}
