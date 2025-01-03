<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Etablissement; // Ajout pour la relation
use App\Models\Niveau; // Ajout pour la gestion des niveaux (si nécessaire)
use App\Models\EtablissementNiveau; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log; // <-- Ajouté ici pour l'importation

class ClasseController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_classe' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        // Créer une nouvelle classe
        $classe = Classe::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Classe créée avec succès!',
            'data' => $classe
        ], 201);
    }

    public function index()
    {
        try {
            $classes = Classe::all();
            return response()->json($classes);
        } catch (\Exception $e) {
            // Utilisation correcte de Log pour enregistrer l'erreur
            Log::error('Erreur de récupération des classes: ' . ($e->getMessage() ?? 'Aucun message d\'erreur disponible'));
            return response()->json(['error' => 'Erreur serveur'], 500);
        }
    }

    public function store(Request $request, $id)
{
    // Récupérer l'établissement
    $etablissement = Etablissement::find($id);
    if (!$etablissement) {
        return response()->json(['message' => 'Établissement non trouvé'], 404);
    }

    // Validation des données
    $request->validate([
        'nom_classe' => 'required|string|max:255',
        'niveau_id' => 'nullable|exists:niveaux,id', // Validation du niveau_id, s'il est fourni
    ]);

    // Création de la classe
    $classe = new Classe();
    $classe->nom_classe = $request->nom_classe;
    $classe->etablissement_id = $id; // Associer la classe à l'établissement

    if ($request->niveau_id) {
        $classe->niveau_id = $request->niveau_id; // Associer le niveau à la classe si fourni
    }

    $classe->save(); // Sauvegarder la classe

    return response()->json(['message' => 'Classe ajoutée avec succès', 'classe' => $classe], 201);
}




}
