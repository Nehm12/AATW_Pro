<?php

namespace App\Http\Controllers;

use App\Models\User; // Modèle qui pointe vers la table 'parent'
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\ParentInscriptionMail;


class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validation des données d'entrée
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:parent', // Vérifie sur la table 'parent'
            'password' => 'required|string|min:8|confirmed', // La confirmation du mot de passe doit être incluse dans la requête
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|max:15', // Vous pouvez ajuster cette limite selon vos besoins
        ]);

        // Si la validation échoue
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }



        // Création du nouvel utilisateur
        try {
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Hash du mot de passe
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'telephone' => $request->telephone,
            ]);

            // Récupérez un utilisateur ou créez un utilisateur fictif
            Mail::to($user->email)->send(new ParentInscriptionMail($user));

            // Réponse en cas de succès
            return response()->json([
                'success' => true,
                'message' => 'Inscription réussie',
                'redirect_url' => '/EnfantRegister', // URL de redirection après inscription
                'data' => [
                    'id' => $user->id, // ID de l'utilisateur
                    'username' => $user->username,
                    'email' => $user->email,
                ],
            ], 201);

            

        } catch (\Exception $e) {
            // Gestion des exceptions
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    


}

