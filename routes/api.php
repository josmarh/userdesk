<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\FolderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware(['auth:sanctum','verified'])->group(function() {
    Route::get('user', function (Request $request) {
        return $request->user();
    });

    // Auth
    Route::put('profile/update', [ProfileController::class, 'updateProfile']);
    Route::put('password/update', [ProfileController::class, 'updatePassword']);
    Route::post('logout', [LogoutController::class, 'logout']);

    // Folder
    Route::get('folders', [FolderController::class, 'index']);
    Route::group(['prefix' => 'folder'], function() {
        Route::post('store', [FolderController::class, 'store']);
        Route::get('show/{id}', [FolderController::class, 'show']);
        Route::put('update/{id}', [FolderController::class, 'update']);
        Route::delete('delete/{id}', [FolderController::class, 'destroy']);
    });
    
});

Route::post('login', [LoginController::class, 'login']);
Route::post('forgot-password', [ForgotPasswordController::class, 'forgotPassword']);
Route::post('reset-password', [ResetPasswordController::class, 'resetPassword']);