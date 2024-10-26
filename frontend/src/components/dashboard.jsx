import React from 'react';

const Dashboard = () => {
  const studentInfo = {
    nom: 'Dupont',
    prenom: 'Jean',
    date_naissance: '2017-05-15',
  };

  const classes = [
    {
      annee: "2019",
      classe: "CI",
      etablissement: "École Primaire A",
      moyenne_1er_trim: "15.0",
      moyenne_2e_trim: "14.5",
      moyenne_3e_trim: "16.0",
      moyenne_annuelle: "15.2",
      rang: "5",
      observation: "Bon travail"
    },
    {
      annee: "2020",
      classe: "CP",
      etablissement: "École Primaire A",
      moyenne_1er_trim: "14.0",
      moyenne_2e_trim: "15.0",
      moyenne_3e_trim: "14.5",
      moyenne_annuelle: "14.5",
      rang: "10",
      observation: "Peut mieux faire"
    },
    {
      annee: "2021",
      classe: "CE1",
      etablissement: "École Primaire A",
      moyenne_1er_trim: "16.0",
      moyenne_2e_trim: "15.5",
      moyenne_3e_trim: "17.0",
      moyenne_annuelle: "16.5",
      rang: "3",
      observation: "Excellent"
    },
    {
      annee: "2022",
      classe: "CE2",
      etablissement: "École Primaire A",
      moyenne_1er_trim: "15.5",
      moyenne_2e_trim: "16.0",
      moyenne_3e_trim: "15.5",
      moyenne_annuelle: "15.7",
      rang: "7",
      observation: "Bien"
    },
    {
      annee: "2023",
      classe: "CM1",
      etablissement: "École Primaire A",
      moyenne_1er_trim: "17.0",
      moyenne_2e_trim: "18.0",
      moyenne_3e_trim: "16.5",
      moyenne_annuelle: "17.2",
      rang: "2",
      observation: "Très bon"
    },
    {
      annee: "2024",
      classe: "CM2",
      etablissement: "École Primaire A",
      moyenne_1er_trim: "18.0",
      moyenne_2e_trim: "17.5",
      moyenne_3e_trim: "18.5",
      moyenne_annuelle: "18.0",
      rang: "1",
      observation: "Excellent travail"
    },
    {
      annee: "2025",
      classe: "6ème",
      etablissement: "Collège B",
      moyenne_1er_trim: "16.5",
      moyenne_2e_trim: "17.0",
      moyenne_3e_trim: "16.0",
      moyenne_annuelle: "16.5",
      rang: "4",
      observation: "Bon résultat"
    },
    {
      annee: "2026",
      classe: "5ème",
      etablissement: "Collège B",
      moyenne_1er_trim: "15.0",
      moyenne_2e_trim: "16.0",
      moyenne_3e_trim: "15.5",
      moyenne_annuelle: "15.5",
      rang: "6",
      observation: "Doit s'améliorer"
    },
    {
      annee: "2027",
      classe: "4ème",
      etablissement: "Collège B",
      moyenne_1er_trim: "17.5",
      moyenne_2e_trim: "18.0",
      moyenne_3e_trim: "17.0",
      moyenne_annuelle: "17.5",
      rang: "3",
      observation: "Très bon élève"
    },
  ];

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
              
              <div className="flex justify-center mb-6">
                <div>
                  <p><strong>Nom :</strong> {studentInfo.nom}</p>
                  <p><strong>Prénom :</strong> {studentInfo.prenom}</p>
                  <p><strong>Date de naissance :</strong> {studentInfo.date_naissance}</p>
                </div>
              </div>

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
                  {classes.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 border border-gray-300">{item.annee}</td>
                      <td className="py-2 border border-gray-300">{item.classe}</td>
                      <td className="py-2 border border-gray-300">{item.etablissement}</td>
                      <td className="py-2 border border-gray-300">{item.moyenne_1er_trim}</td>
                      <td className="py-2 border border-gray-300">{item.moyenne_2e_trim}</td>
                      <td className="py-2 border border-gray-300">{item.moyenne_3e_trim}</td>
                      <td className="py-2 border border-gray-300">{item.moyenne_annuelle}</td>
                      <td className="py-2 border border-gray-300">{item.rang}</td>
                      <td className="py-2 border border-gray-300">{item.observation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6">
                <button 
                  onClick={handleViewInfo}
                  className="mr-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
                >
                  Vérifier les informations
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
