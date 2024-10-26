<?php

namespace App\Http\Controllers;

use App\Models\Enfant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EnfantController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'etablissement_id' => 'required|exists:etablissements,id', // Assurez-vous que l'établissement existe
            'parent_id' => 'required|exists:parent,id', // Assurez-vous que le parent existe
            'classe_id' => 'required|exists:classes,id', // Assurez-vous que la classe existe
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        // Créer un nouvel enfant
        $enfant = Enfant::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Enfant enregistré avec succès!',
            'data' => $enfant
        ], 201);
    }
}
