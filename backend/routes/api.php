<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerServicesController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SimpleAuthController;
use App\Http\Controllers\TravelTipController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;

use Illuminate\Support\Facades\Route;

Route::get('/auth/{provider}/redirect', [AuthController::class, 'redirect']);
Route::get('/auth/{provider}/callback', [AuthController::class, 'callback']);
Route::post('auth/register', [SimpleAuthController::class, 'register']);
Route::post('auth/login', [SimpleAuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [SimpleAuthController::class, 'logout']);

    Route::post('oauth/logout', [AuthController::class, 'logout']);

    Route::apiResource('users', UserController::class);
    Route::apiResource('roles', RoleController::class);
    Route::post('users/{user}/roles/{role}', [UserRoleController::class, 'attach']);
    Route::apiResource('destinations', DestinationController::class);
    Route::apiResource('activities', ActivityController::class);

    Route::apiResource('reservations', ReservationController::class);
    Route::apiResource('payments', PaymentController::class);
    Route::apiResource('customer_service', CustomerServicesController::class);
    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('notifications', NotificationController::class);

    Route::get('/currentUser', [UserController::class, 'getCurrentUser']);
});

Route::apiResource('travel_tips', TravelTipController::class);
