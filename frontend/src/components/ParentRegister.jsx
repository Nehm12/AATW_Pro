import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Register = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register',
        { 
          username, 
          email, 
          nom, 
          prenom, 
          telephone, 
          password, 
          password_confirmation: confirmPassword 
        },
        {
          headers: {
            'accept': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          },
        }
      );

      if (response && response.data) {
        console.log("Inscription réussie :", response.data);
        navigate("/EnfantRegister");
      }
    } catch (e) {
      console.error("Erreur lors de l'inscription :", e);
      if (e.response) {
        setError(e.response.data.message || "Une erreur s'est produite lors de l'inscription.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-400 to-indigo-600 py-20 lg:py-[120px] flex items-center justify-center min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[525px] bg-white shadow-lg rounded-lg py-16 px-12 text-center transition-transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">S'inscrire</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>} 
            <form onSubmit={handleRegister}>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-6">
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-10">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 rounded-md text-white font-semibold shadow-lg hover:shadow-2xl transition duration-300"
                >
                  S'inscrire
                </button>
              </div>
            </form>
            <p className="text-base text-[#adadad]">
              Vous avez déjà un compte?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
