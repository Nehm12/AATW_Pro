<?php

namespace App\Http\Controllers;

use App\Models\Etablissement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtablissementController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_etablissement' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        // Créer un nouvel établissement
        $etablissement = Etablissement::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Établissement créé avec succès!',
            'data' => $etablissement
        ], 201);
    }
    public function index()
    {
        try {
            $etablissements = Etablissement::all();
            return response()->json($etablissements);
        } catch (\Exception $e) {
            \Log::error('Erreur de récupération des établissements: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur serveur'], 500);
        }
    }
}
