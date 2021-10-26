<?php

namespace App\Http\Controllers;

use App\Helper\Castable;
use App\Helper\Format;
use App\Helper\UnixTime;
use App\Models\PostFileTying;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PostFileTyingController extends Controller
{
    public function create(Request $request) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(null, "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $data = $request->all();
        unset($data["me"]);

        if (!( array_key_exists("post_id", $data) && array_key_exists("file_id", $data) && array_key_exists("sort", $data))) {
            $res = Format::forHTTPResponse(errorMessage: "field 'body' must be set");
            return response()->json($res, Response::HTTP_BAD_REQUEST);
        }

        $result = PostFileTying::createPostFileTying(
            fileID: $data["file_id"],
            postID: $data["post_id"],
            sort: $data["sort"],
        );
        
        if (is_null($result)) {
            $res = Format::forHTTPResponse(errorMessage: "creating tying was failed");
            return response()->json($res, Response::HTTP_BAD_REQUEST);
        }

        $res = Format::forHTTPResponse(data: $result);
        return response()->json($res, Response::HTTP_OK);
    }

    public function get(Request $request, string $tyingID) {
        /*
        if ($tyingID === "") {
            $res = Format::forHTTPResponse(errorMessage: "unset PostFileTying ID");
            return response()->json(data: $res, status: Response::HTTP_BAD_REQUEST);
        }
        */

        $tying = PostFileTying::readPostFileTying($tyingID);

        if (is_null($tying)) {
            $res = Format::forHTTPResponse(errorMessage: "tying not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        $res = Format::forHTTPResponse($tying);
        return response()->json(data: $res, status: Response::HTTP_OK);
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

        $q =DB::table('tyings')->where(column: "deleted_at", operator:"=", value: 0);
        if(!$force) {
            $q->
                where(column: "updated_at", operator: ">=", value: $since)->
                where(column: "updated_at", operator: "<", value: $until);
        }

        $tyings = $q->limit($limit)->orderBy("updated_at", "desc")->get();

        $res = Format::forHTTPResponse(data: $tyings);

        return response()->json(data: $res, status: Response::HTTP_OK);
    }

    public function update(Request $request, string $tyingID) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(null, "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $updateData = $request->all();
        unset($updateData["me"]);

        $target = PostFileTying::readPostFileTying($tyingID);
        if (is_null($target)) {
            $res = Format::forHTTPResponse(null, "the tying not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        if ($me->id && $me->id !== $target->user_id_tyinger ) {
            $res = Format::forHTTPResponse(null, "the tying is not yours");
            return response()->json(data: $res, status: Response::HTTP_FORBIDDEN);
        }

        $result = PostFileTying::updatePostFileTying($tyingID, $updateData);
        if (is_null($result)) {
            $res = Format::forHTTPResponse(null, "updating failed");
            return response()->json(data: $res, status: Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $res = Format::forHTTPResponse(data: $result);
        return response()->json(data: $res, status: Response::HTTP_OK);
    } 

    public function delete(Request $request, string $tyingID) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $target = PostFileTying::readPostFileTying($tyingID);
        if (is_null($target)) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "the tying not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        if ($me->id && $me->id !== $target->user_id_tyinger ) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "the tying is not yours");
            return response()->json(data: $res, status: Response::HTTP_FORBIDDEN);
        }

        $result = PostFileTying::deletePostFileTying($tyingID);
        
        if (!$result) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "deleting tying was failed");
            return response()->json(data: $res, status: Response::HTTP_BAD_REQUEST);
        }
        
        $res = Format::forHTTPResponse(data: true);
        return response()->json(data: $res, status: Response::HTTP_OK);
    }
}
