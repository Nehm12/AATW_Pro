<?php

namespace App\Http\Controllers;
use App\Models\Niveau; 

use Illuminate\Http\Request;

class NiveauController extends Controller
{
    //
     // Méthode pour récupérer tous les niveaux
     public function index()
     {
         
         $niveaux = Niveau::all();
 
         // Retourner les niveaux sous forme de JSON
         return response()->json($niveaux);
     }
}
