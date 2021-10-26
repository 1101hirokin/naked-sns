<?php

namespace App\Http\Controllers;

use App\Helper\Castable;
use App\Helper\Format;
use App\Helper\UnixTime;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    public function create(Request $request) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(null, "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $data = $request->all();
        unset($data["me"]);

        if (!array_key_exists("body", $data)) {
            $res = Format::forHTTPResponse(errorMessage: "field 'body' must be set");
            return response()->json($res, Response::HTTP_BAD_REQUEST);
        }

        $result = Post::createPost(
            posterUserID: $me->id,
            body: $data["body"]
        );
        
        if (is_null($result)) {
            $res = Format::forHTTPResponse(errorMessage: "creating post was failed");
            return response()->json($res, Response::HTTP_BAD_REQUEST);
        }

        $res = Format::forHTTPResponse(data: $result);
        return response()->json($res, Response::HTTP_OK);
    }

    public function get(Request $request, string $postID) {
        /*
        if ($postID === "") {
            $res = Format::forHTTPResponse(errorMessage: "unset Post ID");
            return response()->json(data: $res, status: Response::HTTP_BAD_REQUEST);
        }
        */

        $post = Post::readPost($postID);

        if (is_null($post)) {
            $res = Format::forHTTPResponse(errorMessage: "post not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        $res = Format::forHTTPResponse($post);
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

        $q =DB::table('posts')->where(column: "deleted_at", operator:"=", value: 0);
        if(!$force) {
            $q->
                where(column: "updated_at", operator: ">=", value: $since)->
                where(column: "updated_at", operator: "<", value: $until);
        }

        $posts = $q->limit($limit)->orderBy("updated_at", "desc")->get();

        $res = Format::forHTTPResponse(data: $posts);

        return response()->json(data: $res, status: Response::HTTP_OK);
    }

    public function update(Request $request, string $postID) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(null, "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $updateData = $request->all();
        unset($updateData["me"]);

        $target = Post::readPost($postID);
        if (is_null($target)) {
            $res = Format::forHTTPResponse(null, "the post not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        if ($me->id && $me->id !== $target->user_id_poster ) {
            $res = Format::forHTTPResponse(null, "the post is not yours");
            return response()->json(data: $res, status: Response::HTTP_FORBIDDEN);
        }

        $result = Post::updatePost($postID, $updateData);
        if (is_null($result)) {
            $res = Format::forHTTPResponse(null, "updating failed");
            return response()->json(data: $res, status: Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $res = Format::forHTTPResponse(data: $result);
        return response()->json(data: $res, status: Response::HTTP_OK);
    }

    public function delete(Request $request, string $postID) {
        $me = $request->me;
        if (is_null($me)) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "requester not found");
            return response()->json(status: Response::HTTP_UNAUTHORIZED);
        }

        $target = Post::readPost($postID);
        if (is_null($target)) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "the post not found");
            return response()->json(data: $res, status: Response::HTTP_NOT_FOUND);
        }

        if ($me->id && $me->id !== $target->user_id_poster ) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "the post is not yours");
            return response()->json(data: $res, status: Response::HTTP_FORBIDDEN);
        }

        $result = Post::deletePost($postID);
        
        if (!$result) {
            $res = Format::forHTTPResponse(data: false, errorMessage: "deleting post was failed");
            return response()->json(data: $res, status: Response::HTTP_BAD_REQUEST);
        }
        
        $res = Format::forHTTPResponse(data: true);
        return response()->json(data: $res, status: Response::HTTP_OK);
    }
}
