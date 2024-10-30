<?php

namespace App\Http\Controllers;

use App\Models\User; // Modèle qui pointe vers la table 'parent'
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:parent', // Utiliser la table 'parent'
            'password' => 'required|string|min:8|confirmed',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|max:15', // Vous pouvez ajuster la longueur si nécessaire
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        // Créer un nouvel utilisateur
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hachage du mot de passe
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully!',
            'redirect_url' => '/EnfantRegister',  // URL pour la redirection
            'data' => $user
        ], 201);
    }
}
