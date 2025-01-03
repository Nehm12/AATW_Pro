<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\EnfantController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\EtablissementNiveauController;



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
Route::get('/enfants', [EnfantController::class, 'index']);;// Pour récupérer tous les enfants

// Routes pour la Classe
Route::post('/classe/create', [ClasseController::class, 'create']);
Route::get('/classes', [ClasseController::class, 'index']); // Pour récupérer toutes les classes
Route::post('/etablissements/{id}/classes', [ClasseController::class, 'store']);



//Routes pour les etablissements
Route::post('/etablissements', [EtablissementController::class, 'create']);
Route::get('/etablissements', [EtablissementController::class, 'index']);
Route::get('/etablissements/{id}', [EtablissementController::class, 'show']);
Route::get('/etablissements/{id}/niveaux', [EtablissementController::class, 'getNiveaux']);
Route::get('etablissements/{etablissementId}/niveaux/{niveauId}/eleves', [EtablissementController::class, 'getEleves']);
Route::post('/etablissements/{etablissementId}/niveaux/{niveauId}/eleves', [EtablissementController::class, 'affecterEleve']);
// Récupérer les classes d'un établissement pour un niveau spécifique
Route::get('/etablissements/{etablissementId}/niveaux/{niveauId}/classes', [EtablissementController::class, 'getClassesForNiveau']);





//Routes pour les niveaux
Route::get('/niveaux', [NiveauController::class, 'index']);

// Routes pour l'API EtablissementNiveau
Route::post('/etablissement/{etablissementId}/niveaux', [EtablissementNiveauController::class, 'addNiveauToEtablissement']);
Route::get('/etablissement/{etablissementId}/niveaux', [EtablissementNiveauController::class, 'getNiveauxForEtablissement']);


