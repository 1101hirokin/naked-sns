<?php

namespace App\Http\Controllers;

use App\Helper\Castable;
use App\Helper\Format;
use App\Helper\UnixTime;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class FileController extends Controller
{
    public function create(Request $request) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(null, "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $data = $request->all();
        unset($data["me"]);

        /*
            file upload operation here
            $url = "https://uploaded-place.com/file";
        */

        $url = "";

        $result = File::createFile(
            uploaderUserID: $me->id,
            url: $url,
            fileType: 1,
        );
        
        if (is_null($result)) {
            $res = Format::forHTTPResponse(errorMessage: "creating file was failed");
            return response()->json($res, Response::HTTP_BAD_REQUEST);
        }

        $res = Format::forHTTPResponse(data: $result);
        return response()->json($res, Response::HTTP_OK);
    }

    public function get(Request $request, string $fileID) {
        /*
        if ($fileID === "") {
            $res = Format::forHTTPResponse(errorMessage: "unset File ID");
            return response()->json(data: $res, status: Response::HTTP_BAD_REQUEST);
        }
        */

        $file = File::readFile($fileID);

        if (is_null($file)) {
            $res = Format::forHTTPResponse(errorMessage: "file not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        $res = Format::forHTTPResponse($file);
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

        $q =DB::table('files')->where(column: "deleted_at", operator:"=", value: 0);
        if(!$force) {
            $q->
                where(column: "updated_at", operator: ">=", value: $since)->
                where(column: "updated_at", operator: "<", value: $until);
        }

        $files = $q->limit($limit)->orderBy("updated_at", "desc")->get();

        $res = Format::forHTTPResponse(data: $files);

        return response()->json(data: $res, status: Response::HTTP_OK);
    }

    public function update(Request $request, string $fileID) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(null, "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $updateData = $request->all();
        unset($updateData["me"]);

        $target = File::readFile($fileID);
        if (is_null($target)) {
            $res = Format::forHTTPResponse(null, "the file not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        if ($me->id && $me->id !== $target->user_id_uploader ) {
            $res = Format::forHTTPResponse(null, "the file is not yours");
            return response()->json(data: $res, status: Response::HTTP_FORBIDDEN);
        }

        $result = File::updateFile($fileID, $updateData);
        if (is_null($result)) {
            $res = Format::forHTTPResponse(null, "updating failed");
            return response()->json(data: $res, status: Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $res = Format::forHTTPResponse(data: $result);
        return response()->json(data: $res, status: Response::HTTP_OK);
    }

    public function delete(Request $request, string $fileID) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $target = File::readFile($fileID);
        if (is_null($target)) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "the file not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        if ($me->id && $me->id !== $target->user_id_uploader ) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "the file is not yours");
            return response()->json(data: $res, status: Response::HTTP_FORBIDDEN);
        }

        $result = File::deleteFile($fileID);
        
        if (!$result) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "deleting file was failed");
            return response()->json(data: $res, status: Response::HTTP_BAD_REQUEST);
        }
        
        $res = Format::forHTTPResponse(data: true);
        return response()->json(data: $res, status: Response::HTTP_OK);
    }
}
