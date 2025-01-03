<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        $user = User::where('email', $request->email)->first();

        // Si l'utilisateur existe et le mot de passe est correct
        if ($user && Hash::check($request->password, $user->password)) {
            // Authentifie l'utilisateur
            Auth::login($user);

            // Vérifie le rôle de l'utilisateur
            if ($user->role === 'admin') {
                // Si c'est un admin, renvoyer un message spécifique
                return response()->json(['success' => true, 'role' => 'admin']);
            } else {
                // Si c'est un parent, renvoyer un message spécifique
                return response()->json(['success' => true, 'role' => 'parent']);
            }
        }

        // Si l'authentification échoue
        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }
}
