import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [enfants, setEnfants] = useState([]); // Pour stocker les données des enfants
  const [error, setError] = useState(null); // Pour gérer les erreurs

  // Effectuer la requête à l'API lorsque le composant est monté
  useEffect(() => {
    const fetchEnfants = async () => {
      try {
        // Assure-toi d'envoyer les cookies si nécessaire pour l'authentification
        const response = await axios.get('http://127.0.0.1:8000/api/enfants', {
          withCredentials: true, // Permet d'envoyer les cookies avec chaque requête
        });
        setEnfants(response.data); // Stocker les enfants dans l'état
      } catch (e) {
        setError("Impossible de récupérer les enfants.");
      }
    };

    fetchEnfants();
  }, []);

  const handleDownloadCard = () => {
    console.log("Téléchargement de la carte d'élève...");
  };

  const handleViewInfo = () => {
    console.log("Vérification des informations...");
  };

  return (
    <section className="bg-[#F4F7FF] h-screen overflow-auto relative">
      <div className="container mx-auto max-w-5xl p-4 h-full">
        <div className="-mx-4 flex flex-wrap h-full">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-full overflow-hidden rounded-lg bg-white py-16 px-10 text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-4xl">🎓</span>
                <h2 className="text-2xl font-bold">Parcours Académique</h2>
                <span className="text-4xl">📚</span>
              </div>

              {/* Afficher les informations des enfants si elles existent */}
              {error && <p className="text-red-500">{error}</p>} {/* Si une erreur se produit */}

              <div className="flex justify-center mb-6">
                {/* Affichage des enfants */}
                {enfants.length > 0 ? (
                  enfants.map((enfant) => (
                    <div key={enfant.id} className="mb-4">
                      <p><strong>Nom :</strong> {enfant.nom}</p>
                      <p><strong>Prénom :</strong> {enfant.prenom}</p>
                      <p><strong>Date de naissance :</strong> {new Date(enfant.date_naissance).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p>Aucun enfant trouvé.</p>
                )}
              </div>

              {/* Table des résultats scolaires */}
              <table className="min-w-full bg-white border border-gray-200 mb-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 border border-gray-300">Année</th>
                    <th className="py-2 border border-gray-300">Classe</th>
                    <th className="py-2 border border-gray-300">Établissement</th>
                    <th className="py-2 border border-gray-300">Moyenne 1er Trimestre</th>
                    <th className="py-2 border border-gray-300">Moyenne 2e Trimestre</th>
                    <th className="py-2 border border-gray-300">Moyenne 3e Trimestre</th>
                    <th className="py-2 border border-gray-300">Moyenne Annuelle</th>
                    <th className="py-2 border border-gray-300">Rang</th>
                    <th className="py-2 border border-gray-300">Observation</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Affichage des données de chaque enfant */}
                  {enfants.length > 0 ? (
                    enfants.map((enfant) => (
                      <tr key={enfant.id} className="hover:bg-gray-100">
                        <td className="py-2 border border-gray-300">{enfant.annee || 2024}</td>
                        <td className="py-2 border border-gray-300 w-[150px]">
                        {enfant.classe?.nom || "Classe non assignée"}
                        </td>
                        <td className="py-2 border border-gray-300 w-[300px]">
                        {enfant.etablissement?.nom || "Établissement non assigné"}
                        </td>
                        <td className="py-2 border border-gray-300">{enfant.moyenne_1er_trim || "00"}</td>
                        <td className="py-2 border border-gray-300">{enfant.moyenne_2e_trim || "00"}</td>
                        <td className="py-2 border border-gray-300">{enfant.moyenne_3e_trim || "00"}</td>
                        <td className="py-2 border border-gray-300">{enfant.moyenne_annuelle || "00"}</td>
                        <td className="py-2 border border-gray-300">{enfant.rang || "00"}</td>
                        <td className="py-2 border border-gray-300">{enfant.observation || "Aucune"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="12">Aucune donnée disponible</td></tr>
                  )}
                </tbody>
              </table>

              <div className="mt-6">
                <button 
                  onClick={handleViewInfo}
                  className="mr-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
                >
                  Télécharger la fiche d'inscription
                </button>
                <button 
                  onClick={handleDownloadCard}
                  className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded-md text-white"
                >
                  Télécharger la carte d'élève
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
