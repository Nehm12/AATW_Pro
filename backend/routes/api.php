<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\EnfantController;
use App\Http\Controllers\ClasseController;


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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);


// Routes pour l'Enfant
Route::post('/enfant/create', [EnfantController::class, 'register']);
Route::get('/enfants', [EnfantController::class, 'index']); // Pour récupérer tous les enfants

// Routes pour la Classe
Route::post('/classe/create', [ClasseController::class, 'create']);
Route::get('/classes', [ClasseController::class, 'index']); // Pour récupérer toutes les classes



// Routes pour l'Établissement
Route::post('/etablissement/create', [EtablissementController::class, 'create']);
Route::get('/etablissements', [EtablissementController::class, 'index']); // Pour récupérer tous les établissements


