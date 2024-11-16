import React from 'react';

const FicheInscription = React.forwardRef(({ enfant }, ref) => {
  // Vérification si l'objet enfant existe
  if (!enfant) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-xl text-gray-500">Aucune donnée disponible pour la fiche d'inscription.</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="fiche-inscription p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">ATTESTATION D'INSCRIPTION</h2>
      <div className="space-y-4 text-center">
        <p className="text-lg">
          Je soussigné <strong>HOUNGA Exaucé </strong>, Dev de EduControl atteste que :
        </p>
        <p className="text-lg">
          <strong>M. {enfant.nom} {enfant.prenom}</strong>, né(e) le {new Date(enfant.date_naissance).toLocaleDateString()} à {enfant.lieu_naissance || "Lieu non défini"}, est inscrit(e)  sous le numéro matricule {enfant.id} à : {enfant.etablissement?.nom || "Non défini"}, dans la classe : {enfant.classe?.nom || "Non définie"} au titre de l'année académique 2024-2025.
        </p>
        <p className="text-lg">
          Cette attestation a été délivrée à l'intéressé(e) pour servir et valoir ce que de droit.
        </p>
      </div>
    </div>
  );
});

export default FicheInscription;
