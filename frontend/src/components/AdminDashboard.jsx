import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">
          Tableau de Bord Admin
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/add-etablissement"
            className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center"
          >
            Ajouter un Établissement
          </Link>
          <Link
            to="/gerer-etablissements"
            className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 text-center"
          >
            Gérer un Établissement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
