import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importer useNavigate
import axios from 'axios';

const PageGestionEtablissement = () => {
  const { id } = useParams(); // Récupérer l'ID de l'établissement dans l'URL
  const [etablissement, setEtablissement] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Pour gérer l'indicateur de chargement
  const [error, setError] = useState(null); // Pour gérer les erreurs éventuelles
  const navigate = useNavigate(); // Initialiser useNavigate

  useEffect(() => {
    console.log("ID de l'établissement récupéré:", id); // Log de l'ID récupéré depuis l'URL

    // Appel API pour récupérer les données de l'établissement
    axios
      .get(`http://localhost:8000/api/etablissements/${id}`) // Utiliser l'ID pour récupérer l'établissement spécifique
      .then(response => {
        console.log("Réponse API reçue:", response.data); // Log de la réponse de l'API
        setEtablissement(response.data.data); // Accéder à "data.data" ici
        setIsLoading(false); // Désactiver le chargement une fois les données récupérées
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données:', error); // Log d'erreur si l'appel échoue
        setError('Erreur lors du chargement des données');
        setIsLoading(false); // Désactiver le chargement même en cas d'erreur
      });
  }, [id]); // L'appel API sera relancé uniquement lorsque l'ID change

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!etablissement) {
    return <div>Aucun établissement trouvé</div>;
  }

  // Log de la structure des niveaux pour vérifier qu'ils existent et sont au bon format
  console.log("Niveaux de l'établissement:", etablissement.niveaux);

  const handleAjouterClasses = () => {
    // Rediriger vers la page de gestion des classes avec l'ID de l'établissement
    navigate(`/gestion/${id}/classes`);
  };

  const handleAffecterEleves = () => {
    // Rediriger vers la page des niveaux pour affecter des élèves
    navigate(`/etablissements/${id}/niveaux`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Options de gestion pour l'établissement {etablissement.nom_etablissement}
        </h1>
        <p className="text-lg text-gray-700 mb-4">Adresse: {etablissement.adresse}</p>

        {/* Afficher les niveaux */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Niveaux disponibles :</h2>
          <ul className="space-y-2 mt-4">
            {/* Vérification si niveaux existe et n'est pas vide */}
            {etablissement.niveaux && Array.isArray(etablissement.niveaux) && etablissement.niveaux.length > 0 ? (
              etablissement.niveaux.map((niveau) => (
                <li key={niveau.id} className="text-lg text-gray-600">
                  {niveau.nom_niveau} {/* Utilisez `nom_niveau` au lieu de `nom` */}
                </li>
              ))
            ) : (
              <li>Aucun niveau disponible</li>
            )}
          </ul>
        </div>

        <div className="mt-4 space-y-4">
          <button
            onClick={handleAjouterClasses} // Appel de la fonction pour rediriger
            className="w-full p-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Ajouter des classes
          </button>

          <button
            onClick={handleAffecterEleves} // Appel de la fonction pour rediriger vers niveaux
            className="w-full p-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
          >
            Affecter des élèves
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageGestionEtablissement;
