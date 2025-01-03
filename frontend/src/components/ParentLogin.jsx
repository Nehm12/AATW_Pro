import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      console.log("Connexion réussie :", response.data);

      // Vérification du rôle de l'utilisateur
      const { role } = response.data;

      if (role === 'admin') {
        // Si c'est un admin, rediriger vers le tableau de bord admin
        navigate("/admin-dashboard");
      } else if (role === 'parent') {
        // Si c'est un parent, rediriger vers le tableau de bord parent
        navigate("/dashboard");
      }

      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("Erreur lors de la connexion :", e);
      if (e.response) {
        setError(e.response.data.message || "Email ou mot de passe incorrect");
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Connectez-vous</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>} 
            <form onSubmit={handleLogin}>
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
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-5 bg-gray-100 rounded-md border-2 border-gray-200 focus:border-indigo-500 outline-none transition duration-300 text-gray-800"
                />
              </div>
              <div className="mb-10">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 rounded-md text-white font-semibold shadow-lg hover:shadow-2xl transition duration-300"
                >
                  Se connecter
                </button>
              </div>
            </form>
            <Link to="/forgot-password" className="inline-block mb-4 text-sm text-gray-500 hover:text-indigo-500 transition duration-300">
              Mot de passe oublié ?
            </Link>
            <p className="text-sm text-gray-500">
              Vous n'avez pas de compte ?{' '}
              <Link to="/register" className="text-indigo-500 hover:underline">
                S'enregistrer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
