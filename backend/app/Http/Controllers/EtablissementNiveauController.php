<?php

namespace App\Http\Controllers;


use App\Models\Etablissement;
use App\Models\Niveau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtablissementNiveauController extends Controller
{
    //
    public function addNiveauToEtablissement(Request $request, $etablissementId)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'niveaux' => 'required|array',
            'niveaux.*' => 'exists:niveaux,id', // Vérifier si les IDs des niveaux existent
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Récupérer l'établissement
        $etablissement = Etablissement::find($etablissementId);
        if (!$etablissement) {
            return response()->json([
                'success' => false,
                'message' => 'Établissement introuvable',
            ], 404);
        }

        // Ajouter les niveaux à l'établissement
        $etablissement->niveaux()->sync($request->niveaux); // Lier les niveaux à l'établissement

        return response()->json([
            'success' => true,
            'message' => 'Niveaux ajoutés à l\'établissement avec succès!',
        ], 200);
    }

    public function getNiveauxForEtablissement($etablissementId)
    {
        // Récupérer l'établissement avec ses niveaux associés
        $etablissement = Etablissement::with('niveaux')->find($etablissementId);

        if (!$etablissement) {
            return response()->json([
                'success' => false,
                'message' => 'Établissement introuvable',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $etablissement->niveaux,
        ], 200);
    }
}
