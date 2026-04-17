<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\PacienteController;

// Rutas públicas para autenticación
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Rutas para autenticación social con Google
Route::get('/google-auth/redirect', [SocialAuthController::class, 'redirectToGoogle']);
Route::get('/google-auth/callback', [SocialAuthController::class, 'handleGoogleCallback']);

// Rutas para reestablecer contraseña
Route::post('/password/email', [AuthController::class, 'resetPasswordLink']);
Route::get('/password/reset/{token}', [AuthController::class, 'resetPasswordForm'])->name('password.reset');
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

// Rutas protegidas por autenticación Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/profile', [AuthController::class, 'updateProfile']);

    // Rutas para gestión de pacientes
    Route::get('/pacientes', [PacienteController::class, 'getPacientes']);
    Route::get('/pacientes/{id}', [PacienteController::class, 'getPaciente']);
    Route::post('/pacientes', [PacienteController::class, 'store']);
    Route::put('/pacientes/{id}', [PacienteController::class, 'update']);
    Route::delete('/pacientes/{id}', [PacienteController::class, 'destroy']);
});
