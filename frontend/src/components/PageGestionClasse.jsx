import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const PageGestionClasses = () => {
  const { id } = useParams(); // ID de l'établissement à partir de l'URL
  const [niveaux, setNiveaux] = useState([]);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [newClasse, setNewClasse] = useState("");
  const [message, setMessage] = useState("");

  // Récupérer les niveaux de l'établissement
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/etablissements/${id}/niveaux`)
      .then((response) => {
        setNiveaux(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des niveaux:", error);
      });
  }, [id]);

  // Ajouter une classe dans un niveau
  const handleAddClasse = () => {
    if (!newClasse || !selectedNiveau) {
      setMessage("Veuillez sélectionner un niveau et entrer un nom de classe.");
      return;
    }
    

    
    axios
    .post(`http://localhost:8000/api/etablissements/${id}/classes`, {
        nom_classe: newClasse,
        niveau_id: selectedNiveau
      })
  .then((response) => {
    setMessage("Classe ajoutée avec succès !");
    setNewClasse("");
    setSelectedNiveau(null);
  })
  .catch((error) => {
    console.error("Erreur lors de l'ajout de la classe:", error);
    setMessage("Une erreur s'est produite.");
  });

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Ajouter une classe à l'établissement
        </h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Sélectionner un niveau :</h2>
          <select
            onChange={(e) => setSelectedNiveau(e.target.value)}
            value={selectedNiveau || ""}
            className="w-full p-2 border rounded-md"
          >
            <option value="">-- Choisir un niveau --</option>
            {niveaux.map((niveau) => (
              <option key={niveau.id} value={niveau.id}>
                {niveau.nom_niveau}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Nom de la classe :</h2>
          <input
            type="text"
            value={newClasse}
            onChange={(e) => setNewClasse(e.target.value)}
            placeholder="Nom de la classe"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleAddClasse}
          className="w-full p-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Ajouter la classe
        </button>

        {message && (
          <div className="mt-4 text-center text-lg text-green-600">{message}</div>
        )}
      </div>
    </div>
  );
};

export default PageGestionClasses;
