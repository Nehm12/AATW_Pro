import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import CarteEleve from './CarteEleve'; // Vérifiez que le chemin est correct
import FicheInscription from './FicheInscription'; // Vérifiez que le chemin est correct

const Dashboard = () => {
  const [enfants, setEnfants] = useState([]); // Liste des enfants
  const [error, setError] = useState(null); // Gestion des erreurs
  const carteRef = useRef(); // Référence pour la carte d'élève
  const ficheRef = useRef(); // Référence pour la fiche d'inscription

  // Charger les données des enfants au montage du composant
  useEffect(() => {
    const fetchEnfants = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/enfants', {
          withCredentials: true,
        });
        setEnfants(response.data);
      } catch (e) {
        setError("Impossible de récupérer les enfants.");
      }
    };
    fetchEnfants();
  }, []);
  const handleDownloadCard = (enfant) => {
    const doc = new jsPDF();
  
    // Dimensions de la carte
    const cardWidth = 100;  // Largeur de la carte
    const cardHeight = 60;  // Hauteur de la carte
    
    // Ajouter une nouvelle page
    doc.addPage();
    
    // Fond lunaire : couleur claire (gris très pâle)
    doc.setFillColor(220, 220, 220); // Couleur grise lunaire
    doc.rect(10, 20, cardWidth, cardHeight, 'F'); // Fond de la carte
  
    // Bordure de la carte (un rectangle net)
    doc.setDrawColor(169, 169, 169); // Bordure grise
    doc.setLineWidth(0.8);
    doc.rect(10, 20, cardWidth, cardHeight); // Position et dimensions de la carte
  
    // Titre centré en haut de la carte
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.text("CARTE D'ÉTUDIANT", 10 + cardWidth / 2, 15, null, null, 'center');
  
    // Informations à afficher
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5);
  
    // Aligner toutes les informations verticalement et proprement
    doc.text(`Nom : ${enfant.nom}`, 15, 30);
    doc.text(`Prénom : ${enfant.prenom}`, 15, 35);
    doc.text(`Date de naissance : ${new Date(enfant.date_naissance).toLocaleDateString()}`, 15, 40);
    doc.text(`Classe : ${enfant.classe?.nom || 'Non définie'}`, 15, 45);
    doc.text(`Établissement : ${enfant.etablissement?.nom || 'Non défini'}`, 15, 50);
  
    // Nom de la plateforme en bas (centré)
    doc.setFont("helvetica", "italic");
    doc.setFontSize(5);
    doc.text("EduControl", 10 + cardWidth / 2, cardHeight - 5, null, null, 'center');
  
    // Sauvegarder le fichier PDF
    doc.save(`carte-eleve-${enfant.nom}-${enfant.prenom}.pdf`);
  };
  


  const handleDownloadFiche = (enfant) => {
    const doc = new jsPDF();
  
    // Définir la taille de la police pour le titre
    doc.setFontSize(16);
    doc.text("ATTESTATION D'INSCRIPTION", 105, 20, null, null, 'center');
  
    // Ajouter un peu d'espace avant le corps du texte
    doc.setFontSize(12);
    doc.text("Je soussigné HOUNGA Exaucé, Dev de EduControl atteste que :", 105, 40, null, null, 'center');
    
    // Détails de l'élève
    doc.text(`M. ${enfant.nom} ${enfant.prenom}`, 105, 50, null, null, 'center');
    doc.text(`né(e) le ${new Date(enfant.date_naissance).toLocaleDateString()}`, 105, 60, null, null, 'center');
    doc.text(`est inscrit(e) sous le numéro matricule ${enfant.id}`, 105, 70, null, null, 'center');
    doc.text(`à : ${enfant.etablissement?.nom || 'Non défini'},`, 105, 80, null, null, 'center');
    doc.text(`dans la classe : ${enfant.classe?.nom || 'Non définie'}`, 105, 90, null, null, 'center');
    doc.text("au titre de l'année académique 2024-2025.", 105, 100, null, null, 'center');
  
    // Dernière ligne de texte
    doc.text("Cette attestation a été délivrée à l'intéressé(e) pour servir et valoir ce que de droit.", 105, 110, null, null, 'center');
  
    // Sauvegarder le fichier PDF
    doc.save(`fiche-inscription-${enfant.nom}-${enfant.prenom}.pdf`);
  };
  
  

  return (
    <section className="bg-[#F4F7FF] h-screen overflow-auto relative">
      <div className="container mx-auto max-w-5xl p-4 h-full">
        <div className="relative mx-auto max-w-full overflow-hidden rounded-lg bg-white py-16 px-10 text-center">
          <h2 className="text-2xl font-bold mb-6">🎓 Parcours Académique 📚</h2>

          {/* Affichage des erreurs */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Liste des enfants */}
          {enfants.length > 0 ? (
            enfants.map((enfant) => (
              <div key={enfant.id} className="mb-6">
                <div className="mb-4">
                  <p>
                    <strong>Nom :</strong> {enfant.nom}
                  </p>
                  <p>
                    <strong>Prénom :</strong> {enfant.prenom}
                  </p>
                  <p>
                    <strong>Date de naissance :</strong>{' '}
                    {new Date(enfant.date_naissance).toLocaleDateString()}
                  </p>
                </div>

                {/* Tableau des notes */}
                <table className="min-w-full bg-white border border-gray-200 mb-4">
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
                    <tr key={enfant.id} className="hover:bg-gray-100">
                      <td className="py-2 border border-gray-300">{enfant.annee || 2024}</td>
                      <td className="py-2 border border-gray-300">{enfant.classe?.nom || "Classe non assignée"}</td>
                      <td className="py-2 border border-gray-300">{enfant.etablissement?.nom || "Établissement non assigné"}</td>
                      <td className="py-2 border border-gray-300">{enfant.moyenne_1er_trim || "00"}</td>
                      <td className="py-2 border border-gray-300">{enfant.moyenne_2e_trim || "00"}</td>
                      <td className="py-2 border border-gray-300">{enfant.moyenne_3e_trim || "00"}</td>
                      <td className="py-2 border border-gray-300">{enfant.moyenne_annuelle || "00"}</td>
                      <td className="py-2 border border-gray-300">{enfant.rang || "00"}</td>
                      <td className="py-2 border border-gray-300">{enfant.observation || "Aucune"}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleDownloadCard(enfant)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Télécharger la Carte d'Élève
                  </button>
                  <button
                    onClick={() => handleDownloadFiche(enfant)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md"
                  >
                    Télécharger la Fiche d'Inscription
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun enfant trouvé.</p>
          )}
        </div>
      </div>

      {/* Références pour les composants imprimables */}
      <div style={{ display: 'none' }}>
        <CarteEleve ref={carteRef} enfant={null} />
        <FicheInscription ref={ficheRef} enfant={null} />
      </div>
    </section>
  );
};

export default Dashboard;
