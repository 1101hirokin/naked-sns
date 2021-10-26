<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureJWTIsValid;
use App\Http\Middleware\ShaveUserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function (Request $request) {
    return [
        "hiroki?" => true,
    ];
});

Route::post('/login', [AuthController::class, 'login']);

// this route must be deleted
Route::get('/hash/{target}', [AuthController::class, 'hash']);
Route::post('/check-jwt', [AuthController::class, 'checkJWT']);

Route::get('/users/{userID}', [UserController::class, 'get'])->middleware(ShaveUserInfo::class);
Route::get('/users', [UserController::class, 'getIndex'])->middleware(ShaveUserInfo::class);

Route::get('/posts', [PostController::class, 'getIndex']);
Route::get('/posts/{postID}', [PostController::class, 'get']);

Route::middleware(EnsureJWTIsValid::class)->group(function () {
    Route::get('/me', [UserController::class, 'getMe']);
    Route::put('/me', [UserController::class, 'updateMe']);
    
    Route::post('/posts', [PostController::class, 'create']);
    Route::put('/posts/{postID}', [PostController::class, 'update']);
    Route::delete('/posts/{postID}', [PostController::class, 'delete']);
});
