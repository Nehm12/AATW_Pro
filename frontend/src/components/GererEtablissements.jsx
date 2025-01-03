import { useState, useEffect } from "react";
import axios from "../api/axios"; // Assurez-vous que votre client axios est configuré
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const GererEtablissement = () => {
  const [etablissements, setEtablissements] = useState([]); // État pour les établissements
  const [selectedEtablissement, setSelectedEtablissement] = useState(null); // État pour l'établissement sélectionné
  const navigate = useNavigate(); // Hook de navigation

  // Récupérer tous les établissements depuis l'API
  useEffect(() => {
    const fetchEtablissements = async () => {
      try {
        const response = await axios.get("/api/etablissements"); // API pour récupérer les établissements
        if (response.data.success) {
          setEtablissements(response.data.data); // Mettre à jour l'état avec les établissements récupérés
        } else {
          console.error("Erreur: Établissements non récupérés");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des établissements", error);
      }
    };
    fetchEtablissements();
  }, []); // Le tableau vide [] assure que l'effet ne se déclenche qu'une seule fois après le premier rendu

  // Gérer la sélection d'un établissement et rediriger vers la page de gestion
  const handleSelectEtablissement = (etablissementId) => {
    navigate(`/gestion/${etablissementId}`); // Rediriger vers la page de gestion de l'établissement
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Gérer un Établissement</h1>

        {/* Affichage de la liste des établissements */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Choisir un établissement</h2>
          <ul className="space-y-4 mt-4">
            {etablissements.length > 0 ? (
              etablissements.map((etablissement) => (
                <li key={etablissement.id}>
                  <button
                    onClick={() => handleSelectEtablissement(etablissement.id)}
                    className="w-full p-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    {etablissement.nom_etablissement}
                  </button>
                </li>
              ))
            ) : (
              <li>Aucun établissement trouvé</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GererEtablissement;
