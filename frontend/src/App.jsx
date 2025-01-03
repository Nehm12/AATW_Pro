import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/ParentLogin';
import Register from './components/ParentRegister';
import EnfantRegister from './components/EnfantRegister';
import Dashboard from './components/dashboard'; // Tableau de bord pour les parents
import AdminDashboard from './components/AdminDashboard'; // Nouveau tableau de bord pour les admins
import AddEtablissement from './components/AddEtablissement';
import AddClasses from './components/AddClasses';
import AssignEleves from './components/AssignEleves';
import GererEtablissements from './components/GererEtablissements';
import PageGestionEtablissement  from './components/PageGestionEtablissement';
import PageGestionClasses from './components/PageGestionClasse';
import NiveauxPage from './components/PageNiveauEtablissement';
import ElevesPage from "./components/ElevesPage";


import Logout from './components/logout'; // Importer le composant Logout

function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen"> 
        {/* Header */}
        <header className="bg-blue-900 text-white py-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between px-4">
            <h1 className="text-3xl font-bold">
              <Link to="/" className="text-gray-200 hover:text-white">EducControl</Link>
            </h1>
            <nav className="hidden md:flex space-x-8">
              <Link to="/login" className="text-gray-200 hover:text-white">Connexion</Link>
              <Link to="/register" className="text-gray-200 hover:text-white">Inscription</Link>
              <Link to="/logout" className="text-gray-200 hover:text-white">Déconnexion </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/enfantregister" element={<EnfantRegister />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Route pour le dashboard admin */}
            <Route path="/add-etablissement" element={<AddEtablissement />} />
            <Route path="/add-classes" element={<AddClasses />} />
            <Route path="/assign-eleves" element={<AssignEleves />} />
            <Route path="/gerer-etablissements" element={<GererEtablissements />} />
            <Route path="/gestion/:id" element={<PageGestionEtablissement />} />
            <Route path="/gestion/:id/classes" element={<PageGestionClasses />} />
            <Route path="/etablissements/:etablissementId/niveaux" element={<NiveauxPage />} />
            <Route path="/etablissement/:etablissementId/niveau/:niveauId/eleves" element={<ElevesPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} EducControl. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
