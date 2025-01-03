<?php

namespace App\Http\Controllers;

use App\Models\Etablissement;
use App\Models\Enfant;
use App\Models\Classe;
use App\Models\Niveau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EtablissementController extends Controller
{
    public function create(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom_etablissement' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Créer un nouvel établissement avec des données validées
        $etablissement = Etablissement::create([
            'nom_etablissement' => $request->nom_etablissement,
            'adresse' => $request->adresse,
        ]);

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
            return response()->json([
                'success' => true,
                'data' => $etablissements
            ]);
        } catch (\Exception $e) {
            // Log de l'erreur
            Log::error('Erreur de récupération des établissements: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'error' => 'Erreur serveur, veuillez réessayer plus tard'
            ], 500);
        }
    }

    public function show($id)
    {
        // Trouver l'établissement par son ID et charger les niveaux associés
        $etablissement = Etablissement::with('niveaux')->find($id);

        // Vérifier si l'établissement existe
        if ($etablissement) {
            return response()->json([
                'success' => true,
                'data' => $etablissement
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Établissement non trouvé'
            ], 404);
        }
    }

    public function getNiveaux($id)
    {
        $etablissement = Etablissement::find($id);
        if (!$etablissement) {
            return response()->json(['message' => 'Établissement non trouvé'], 404);
        }

        // Récupérer les niveaux associés à cet établissement
        $niveaux = $etablissement->niveaux;  // On suppose que l'établissement a une relation 'niveaux'
        return response()->json($niveaux);
    }

    public function getEleves($etablissementId, $niveauId)
    {
        // Récupérer les élèves associés à cet établissement et niveau
        $eleves = Enfant::where('etablissement_id', $etablissementId)
                        ->where('niveau_id', $niveauId)
                        ->get();

        // Retourner les résultats sous forme de JSON
        return response()->json($eleves);
    }

    public function affecterEleve(Request $request, $etablissementId, $niveauId)
    {
        // Vérifiez si l'établissement existe
        $etablissement = Etablissement::find($etablissementId);
        if (!$etablissement) {
            return response()->json(['error' => 'Etablissement non trouvé'], 404);
        }

        // Vérifiez si le niveau existe
        $niveau = Niveau::find($niveauId);
        if (!$niveau) {
            return response()->json(['error' => 'Niveau non trouvé'], 404);
        }

        // Vérifiez que l'ID de l'élève et la classe sont fournis
        $eleveId = $request->input('eleveId');
        $classeId = $request->input('classeId');

        if (!$eleveId || !$classeId) {
            return response()->json(['error' => 'ID de l\'élève ou de la classe manquant'], 400);
        }

        // Vérifiez si l'élève existe
        $eleve = Enfant::find($eleveId);
        if (!$eleve) {
            return response()->json(['error' => 'Élève non trouvé'], 404);
        }

        // Vérifiez si la classe existe dans le niveau
        $classe = Classe::find($classeId);
        if (!$classe || $classe->niveau_id != $niveauId) {
            return response()->json(['error' => 'Classe non trouvée ou ne correspond pas au niveau'], 404);
        }

        // Affecter l'élève au niveau et à la classe
        $eleve->niveau_id = $niveauId;  // Assurez-vous que l'élève a un champ niveau_id
        $eleve->classe_id = $classeId;  // Assurez-vous que l'élève a un champ classe_id
        $eleve->save();

        // Retourner une réponse indiquant que l'affectation a été réalisée
        return response()->json(['message' => 'Élève affecté au niveau et à la classe avec succès'], 200);
    }

    public function getClassesForNiveau($etablissementId, $niveauId)
    {
        // Vérifier si l'établissement existe
        $etablissement = Etablissement::find($etablissementId);
        if (!$etablissement) {
            return response()->json(['error' => 'Etablissement non trouvé'], 404);
        }

        // Vérifier si le niveau existe
        $niveau = Niveau::find($niveauId);
        if (!$niveau) {
            return response()->json(['error' => 'Niveau non trouvé'], 404);
        }

        // Récupérer les classes associées à cet établissement et à ce niveau
        $classes = Classe::where('etablissement_id', $etablissementId)
                        ->where('niveau_id', $niveauId)
                        ->get();

        // Vérifier si des classes sont trouvées
        if ($classes->isEmpty()) {
            return response()->json(['message' => 'Aucune classe trouvée pour cet établissement et ce niveau'], 404);
        }

        // Retourner les classes dans la réponse
        return response()->json($classes);
    }
}
