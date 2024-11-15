import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// Définir la fonction getCookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const RegisterEnfant = () => {
  const location = useLocation();
  const parentId = location.state?.parentId; // Récupérer l'ID du parent


  // Vérifier si parentId est manquant
if (!parentId) {
    return <div>Erreur : ID du parent manquant. Impossible de procéder à l'enregistrement de l'enfant.</div>;
}

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    etablissement_id: "",
    classe_id: "",
    parent_id: parentId || "", // Assurez-vous que l'ID du parent est bien assigné
  });

  const [etablissements, setEtablissements] = useState([]);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [etablissementResponse, classeResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/etablissements', { withCredentials: true }),
        axios.get('http://localhost:8000/api/classes', { withCredentials: true })
      ]);

      setEtablissements(etablissementResponse.data.map(etab => ({ id: etab.id, nom: etab.nom_etablissement })));
      setClasses(classeResponse.data.map(classe => ({ id: classe.id, nom: classe.nom_classe })));
    } catch (e) {
      setError("Impossible de charger les données. " + (e.response?.data?.message || e.message));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    if (!formData.nom || !formData.prenom || !formData.date_naissance || !formData.etablissement_id || !formData.classe_id) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
      // Vérification de la structure des données
      console.log("Données envoyées :", formData);

    try {
      const response = await axios.post('/api/enfant/create', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),  // Utilisation de la fonction getCookie
        },
      });


    console.log("Réponse API:", response.data); // Ajout du log pour la réponse API


      if (response && response.data) {
        setFormData({
          nom: "",
          prenom: "",
          date_naissance: "",
          etablissement_id: "",
          classe_id: "",
          parent_id: parentId,
        });
        fetchData();
        navigate("/dashboard");
      }
    } catch (e) {
      console.log("Erreur API:", e.response?.data || e.message); 
      setError(e.response?.data?.message || "Une erreur s'est produite lors de l'inscription.");
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-400 to-indigo-600 py-20 lg:py-[120px] flex items-center justify-center min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[525px] bg-white shadow-lg rounded-lg py-16 px-12 text-center transition-transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Inscription de l'Enfant</h2>
            
            {error && (
              <div className="mb-4 text-red-500 bg-red-100 p-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-6">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom de l'enfant"
                  value={formData.nom}
                  onChange={handleChange}
                  className="border-[#E9EDF4] w-full rounded-md border bg-gray-100 py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-indigo-500 transition duration-300"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom de l'enfant"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="border-[#E9EDF4] w-full rounded-md border bg-gray-100 py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-indigo-500 transition duration-300"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="date"
                  name="date_naissance"
                  value={formData.date_naissance}
                  onChange={handleChange}
                  className="border-[#E9EDF4] w-full rounded-md border bg-gray-100 py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-indigo-500 transition duration-300"
                  required
                />
              </div>

              <div className="mb-6">
                <select
                  name="etablissement_id"
                  value={formData.etablissement_id}
                  onChange={handleChange}
                  className="border-[#E9EDF4] w-full rounded-md border bg-gray-100 py-3 px-5 text-base text-body-color outline-none focus:border-indigo-500 transition duration-300"
                  required
                >
                  <option value="">Sélectionnez l'établissement</option>
                  {etablissements.map(etab => (
                    <option key={etab.id} value={etab.id}>
                      {etab.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <select
                  name="classe_id"
                  value={formData.classe_id}
                  onChange={handleChange}
                  className="border-[#E9EDF4] w-full rounded-md border bg-gray-100 py-3 px-5 text-base text-body-color outline-none focus:border-indigo-500 transition duration-300"
                  required
                >
                  <option value="">Sélectionnez une classe</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-10">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 rounded-md text-white font-semibold shadow-lg hover:shadow-2xl transition duration-300"
                >
                  Inscrire l'enfant
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterEnfant;
