import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const NiveauxPage = ({ onSelectNiveau }) => {
  const { etablissementId } = useParams();
  const [niveaux, setNiveaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook pour naviguer vers une autre page

  useEffect(() => {
    console.log("ID depuis useParams :", etablissementId);

    if (!etablissementId || isNaN(etablissementId)) {
      console.error("ID invalide :", etablissementId);
      setError("ID d'établissement invalide.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8000/api/etablissements/${etablissementId}/niveaux`)
      .then((response) => {
        console.log("Réponse API complète :", response.data);

        if (response.data.success === false) {
          console.warn("Message de l'API :", response.data.message);
          setError(response.data.message);
          setLoading(false);
        } else {
          const niveauxData = response.data;
          console.log("Niveaux :", niveauxData);

          if (niveauxData.length > 0) {
            setNiveaux(niveauxData);
          } else {
            setError("Aucun niveau trouvé.");
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Erreur API :", error.message);
        setError("Erreur lors de la connexion à l'API.");
        setLoading(false);
      });
  }, [etablissementId]);

  const handleNiveauClick = (niveauId) => {
    // Rediriger vers la page des élèves inscrits dans ce niveau
    navigate(`/etablissement/${etablissementId}/niveau/${niveauId}/eleves`);
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f4f7f6",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      color: "#333",
      fontSize: "2rem",
      marginBottom: "20px",
    },
    list: {
      listStyleType: "none",
      padding: "0",
      margin: "0",
    },
    listItem: {
      marginBottom: "15px",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    button: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.2rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      textAlign: "center",
    },
    loading: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#888",
    },
    error: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "red",
    },
  };

  if (loading) return <p style={styles.loading}>Chargement des niveaux...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Liste des niveaux</h1>
      <ul style={styles.list}>
        {niveaux.length > 0 ? (
          niveaux.map((niveau) => (
            <li key={niveau.id} style={styles.listItem}>
              <button
                style={styles.button}
                onClick={() => handleNiveauClick(niveau.id)}
              >
                {niveau.nom_niveau}
              </button>
            </li>
          ))
        ) : (
          <p>Aucun niveau trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default NiveauxPage;
