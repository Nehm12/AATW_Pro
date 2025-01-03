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

  if (!parentId) {
    return <div>Erreur : ID du parent manquant. Impossible de procéder à l'enregistrement de l'enfant.</div>;
  }

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    etablissement_id: "",
    niveau_id: "",
    parent_id: parentId || "",
  });

  const [etablissements, setEtablissements] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour récupérer les établissements
  const fetchData = async () => {
    setLoading(true); // Début du chargement
    try {
      const etablissementResponse = await axios.get('http://localhost:8000/api/etablissements', { withCredentials: true });

      console.log("Réponse des établissements:", etablissementResponse.data); // Vérifiez la structure de la réponse

      // Accéder à 'data' dans la réponse
      if (Array.isArray(etablissementResponse.data.data)) {
        setEtablissements(etablissementResponse.data.data); // Utiliser 'data' qui contient le tableau d'établissements
      } else {
        setError("La réponse des établissements n'est pas un tableau.");
      }
    } catch (e) {
      setError("Impossible de charger les établissements. " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Fonction pour récupérer les niveaux d'un établissement
  const fetchNiveaux = async (etablissementId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/etablissements/${etablissementId}/niveaux`, { withCredentials: true });
      
      console.log("Réponse des niveaux pour l'établissement:", response.data); // Vérifiez les niveaux renvoyés

      // Assurez-vous que la réponse contient un tableau de niveaux
      if (Array.isArray(response.data)) {
        setNiveaux(response.data);
      } else {
        setNiveaux([]); // Réinitialise les niveaux si la réponse n'est pas un tableau
      }
    } catch (e) {
      setError("Impossible de charger les niveaux. " + (e.response?.data?.message || e.message));
    }
  };

  // Lorsqu'un établissement est sélectionné, récupère les niveaux associés
  const handleEtablissementChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, etablissement_id: value, niveau_id: "" })); // Réinitialise le niveau sélectionné
    fetchNiveaux(value); // Récupère les niveaux associés à l'établissement sélectionné
  };

  useEffect(() => {
    fetchData(); // Récupérer les établissements au chargement de la page
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
  
    console.log("Données envoyées :", formData); // Vérifiez ce qui est envoyé
  
    if (!formData.nom || !formData.prenom || !formData.date_naissance || !formData.etablissement_id || !formData.niveau_id) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    try {
      const response = await axios.post('/api/enfant/create', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'), // Utilisation de la fonction getCookie
        },
      });
  
      if (response && response.data) {
        setFormData({
          nom: "",
          prenom: "",
          date_naissance: "",
          etablissement_id: "",
          niveau_id: "",
          parent_id: parentId,
        });
        fetchData();
        navigate("/dashboard");
      }
    } catch (e) {
      setError(e.response?.data?.message || "Une erreur s'est produite lors de l'inscription.");
    }
  };
  

  if (loading) {
    return <div>Chargement des établissements...</div>; // Affiche un message de chargement
  }

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
                  onChange={handleEtablissementChange}
                  className="border-[#E9EDF4] w-full rounded-md border bg-gray-100 py-3 px-5 text-base text-body-color outline-none focus:border-indigo-500 transition duration-300"
                  required
                >
                  <option value="">Sélectionnez l'établissement</option>
                  {Array.isArray(etablissements) && etablissements.length > 0 ? (
                    etablissements.map((etab) => (
                      <option key={etab.id} value={etab.id}>
                        {etab.nom_etablissement} {/* Assurez-vous que 'nom_etablissement' est une chaîne */}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun établissement trouvé</option>
                  )}
                </select>

                <select
                  name="niveau_id"
                  value={formData.niveau_id}
                  onChange={handleChange}
                  className="border-[#E9EDF4] w-full rounded-md border bg-gray-100 py-3 px-5 text-base text-body-color outline-none focus:border-indigo-500 transition duration-300"
                  required
                >
                  <option value="">Sélectionnez un niveau</option>
                  {Array.isArray(niveaux) && niveaux.length > 0 ? (
                    niveaux.map((niveau) => (
                      <option key={niveau.id} value={niveau.id}>
                        {niveau.nom_niveau} {/* Assurez-vous que 'nom_niveau' est une chaîne */}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun niveau disponible pour cet établissement</option>
                  )}
                </select>

              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-md py-3 px-6 hover:bg-indigo-700 transition duration-300 w-full"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterEnfant;
