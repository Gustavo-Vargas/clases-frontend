import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
	const { loading, isAuthenticated } = useAuth();
	
	// SI esta cargando la app los datos retorna cargando en un h1
	if (loading) {
		return <h1>cargando...</h1>
	}

	// SI la aplicacioón no está cargando 
	/// y además no está autenticado, entonces redrige a /login
	if (!isAuthenticated) 
		return <Navigate to="/login" replace />; // replace: no permita que el usuario vuelva a la ruta anterior

	return ( <Outlet />)
}

export default ProtectedRoute;
