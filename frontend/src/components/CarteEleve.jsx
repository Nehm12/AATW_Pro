import React from 'react';

const CarteEleve = React.forwardRef(({ enfant }, ref) => {
  if (!enfant) {
    return <p>Aucune donnée disponible pour cet élève.</p>;
  }

  return (
    <div ref={ref} className="carte-eleve">
      <h2>Carte d'Élève</h2>
      <p><strong>Nom :</strong> {enfant.nom}</p>
      <p><strong>Prénom :</strong> {enfant.prenom}</p>
      <p><strong>Date de naissance :</strong> {new Date(enfant.date_naissance).toLocaleDateString()}</p>
      <p><strong>Classe :</strong> {enfant.classe?.nom || "Non définie"}</p>
      <p><strong>Établissement :</strong> {enfant.etablissement?.nom || "Non défini"}</p>
    </div>
  );
});

export default CarteEleve;
