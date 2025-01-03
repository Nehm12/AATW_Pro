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

    public function index()
    {
        // Vérifier si un parent_id est passé et filtrer en fonction de ça
        $parent_id = request()->query('parent_id'); // Assumer que 'parent_id' est un paramètre optionnel

        if ($parent_id) {
            // Récupérer les enfants du parent spécifié
            $enfants = Enfant::where('parent_id', $parent_id)->get();
            $enfants = Enfant::with(['classe', 'etablissement'])->where('parent_id', $parent_id)->get();
        } else {
            // Si aucun parent_id n'est spécifié, récupérer tous les enfants
            $enfants = Enfant::all();
        }

        return response()->json($enfants);
    }
}
