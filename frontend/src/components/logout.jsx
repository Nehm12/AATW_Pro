import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logique de déconnexion (par exemple, supprimer le token ou l'état utilisateur)
    console.log("Déconnexion en cours...");
    // Redirection vers la page d'accueil
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Vous êtes sur le point de vous déconnecter</h1>
      <p className="mb-8">Êtes-vous sûr de vouloir continuer ?</p>
      <div>
        <button
          onClick={handleLogout}
          className="mr-4 px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md text-white"
        >
          Oui, déconnectez-moi
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
        >
          Non, revenir en arrière
        </button>
      </div>
    </div>
  );
};

export default Logout;
