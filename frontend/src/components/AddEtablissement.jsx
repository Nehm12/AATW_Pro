import { useState, useEffect } from "react";
import axios from "../api/axios"; // Assurez-vous d'avoir configuré un client axios

const AddEtablissement = () => {
  const [nomEtablissement, setNomEtablissement] = useState("");
  const [adresse, setAdresse] = useState("");
  const [niveaux, setNiveaux] = useState([]); // Tous les niveaux disponibles
  const [selectedNiveaux, setSelectedNiveaux] = useState([]); // Niveaux sélectionnés
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Charger les niveaux disponibles depuis l'API
  useEffect(() => {
    const fetchNiveaux = async () => {
      try {
        const response = await axios.get("/api/niveaux");
        setNiveaux(response.data);  // Mettre à jour les niveaux dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des niveaux :", error);
        setErrorMessage("Impossible de charger les niveaux.");
      }
    };
    fetchNiveaux();
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Étape 1 : Créer l'établissement
      const etablissementResponse = await axios.post("/api/etablissements", {
        nom_etablissement: nomEtablissement,
        adresse,
      });

      console.log("Réponse de l'API lors de la création de l'établissement :", etablissementResponse.data); // Affichez la réponse complète

      const etablissementId = etablissementResponse.data.data.id;

      console.log("ID de l'établissement créé :", etablissementId); // Afficher l'ID dans la console

      // Étape 2 : Associer les niveaux à l'établissement
      await axios.post(`/api/etablissement/${etablissementId}/niveaux`, {
        niveaux: selectedNiveaux,
    });
    
      // Réinitialiser le formulaire
      setNomEtablissement("");
      setAdresse("");
      setSelectedNiveaux([]);
      setSuccessMessage("Établissement ajouté avec succès !");
      setErrorMessage("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'établissement :", error);
      setErrorMessage("Une erreur est survenue lors de l'ajout.");
      setSuccessMessage("");
      console.error("Détails de l'erreur :", error.response?.data);
    }
  };

  // Gérer la sélection des niveaux
  const handleSelectNiveau = (niveauId) => {
    if (selectedNiveaux.includes(niveauId)) {
      setSelectedNiveaux(selectedNiveaux.filter((id) => id !== niveauId));
    } else {
      setSelectedNiveaux([...selectedNiveaux, niveauId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Ajouter un Établissement</h1>

        {successMessage && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nom de l'établissement
            </label>
            <input
              type="text"
              value={nomEtablissement}
              onChange={(e) => setNomEtablissement(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Adresse
            </label>
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Sélectionner les niveaux
            </label>
            <div className="grid grid-cols-2 gap-4">
              {niveaux.map((niveau) => (
                <div key={niveau.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`niveau-${niveau.id}`}
                    value={niveau.id}
                    checked={selectedNiveaux.includes(niveau.id)}
                    onChange={() => handleSelectNiveau(niveau.id)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`niveau-${niveau.id}`}
                    className="ml-2 text-gray-700"
                  >
                    {niveau.nom_niveau} {/* Affichage du nom du niveau */}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Ajouter l'établissement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEtablissement;
