import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ElevesPage = () => {
  const { etablissementId, niveauId } = useParams();
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [affectationMessage, setAffectationMessage] = useState("");
  const [niveauNom, setNiveauNom] = useState('');

  useEffect(() => {
    console.log("Etablissement ID:", etablissementId);
    console.log("Niveau ID:", niveauId);
  
    // Fonction asynchrone pour récupérer les élèves, classes et niveaux
    const fetchData = async () => {
      try {
        // Récupérer les élèves
        const elevesResponse = await axios.get(
          `http://localhost:8000/api/etablissements/${etablissementId}/niveaux/${niveauId}/eleves`
        );
        console.log("Elèves inscrits :", elevesResponse.data);
  
        if (Array.isArray(elevesResponse.data)) {
          setEleves(elevesResponse.data);
        } else {
          setError("Les données des élèves ne sont pas sous forme de tableau.");
        }
  
        // Récupérer les classes
        const classesResponse = await axios.get(
          `http://localhost:8000/api/etablissements/${etablissementId}/niveaux/${niveauId}/classes`
        );
        console.log("Classes disponibles :", classesResponse.data);
        setClasses(classesResponse.data);
  
        // Récupérer tous les niveaux
        const niveauxResponse = await axios.get(
          `http://localhost:8000/api/etablissements/${etablissementId}/niveaux`
        );
  
        // Log des données des niveaux pour vérifier la structure
        console.log("Réponse des niveaux :", niveauxResponse.data);
  
        // Chercher le niveau avec l'ID spécifique et récupérer son nom
        // Chercher le niveau avec l'ID spécifique et récupérer son nom
        const niveau = niveauxResponse.data.find((niveau) => niveau.id === parseInt(niveauId));
        if (niveau) {
        console.log("Niveau trouvé :", JSON.stringify(niveau, null, 2));  // Afficher l'objet niveau
        setNiveauNom(niveau.nom_niveau);  // Mettre à jour le nom du niveau avec 'nom_niveau'
        } else {
        setError("Niveau non trouvé");
        }

      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.message);
        setError("Aucun enfant inscrit ou aucune classe créé dans ce niveau.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [etablissementId, niveauId]);
  
  

  // Fonction pour gérer l'affectation des élèves
  const handleAffectation = (eleveId, classeId) => {
    console.log("Affectation de l'élève", eleveId, "à la classe", classeId);

    axios
      .post(
        `http://localhost:8000/api/etablissements/${etablissementId}/niveaux/${niveauId}/eleves`,
        { eleveId, classeId }
      )
      .then((response) => {
        console.log("Affectation réussie :", response.data);
        setAffectationMessage("Affectation réussie !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'affectation :", error.message);
        setAffectationMessage("Erreur lors de l'affectation.");
      });
  };

  // Affichage du contenu en fonction de l'état de chargement ou d'erreur
  if (loading) return <p>Chargement des élèves...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Élèves du niveau {niveauNom}</h1>
      {affectationMessage && <p style={styles.message}>{affectationMessage}</p>}
      <ul style={styles.list}>
        {eleves.length > 0 ? (
          eleves.map((eleve) => (
            <li key={eleve.id} style={styles.listItem}>
              <span style={styles.eleveName}>
                {eleve.nom} {eleve.prenom}
              </span>
              <select
                style={styles.select}
                onChange={(e) => setSelectedClasse(e.target.value)}
              >
                <option value="">Affecter à une classe</option>
                {classes.map((classe) => (
                  <option key={classe.id} value={classe.id}>
                    {classe.nom_classe}
                  </option>
                ))}
              </select>
              <button
                style={styles.button}
                onClick={() => handleAffectation(eleve.id, selectedClasse)}
              >
                Valider l'affectation
              </button>
            </li>
          ))
        ) : (
          <p>Aucun élève trouvé pour ce niveau.</p>
        )}
      </ul>
    </div>
  );
};

// Style en ligne pour améliorer l'affichage
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f7f6",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#333",
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eleveName: {
    fontWeight: "bold",
    color: "#333",
  },
  select: {
    padding: "5px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    color: "#28a745",
    textAlign: "center",
    margin: "20px 0",
    fontWeight: "bold",
  },
};

export default ElevesPage;
