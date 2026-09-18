<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\UserImportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// CA-1: importação CSV (apenas admin, validado dentro do controller).
Route::middleware('auth:sanctum')->post('/users/import', [UserImportController::class, 'import']);

// Rotas públicas de autenticação.
Route::post('/register/activate', [PasswordController::class, 'activate']);       // CA-2
Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('throttle:auth');                                                  // CA-3/CA-4
Route::post('/auth/forgot-password', [PasswordController::class, 'forgotPassword']); // CA-6
Route::post('/auth/reset-password', [PasswordController::class, 'resetPassword']);   // CA-6

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
});
