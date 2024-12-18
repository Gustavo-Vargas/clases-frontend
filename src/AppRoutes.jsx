import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// import EjemploPage from "./pages/EjemploPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import ClasesPage from "./pages/ClasesPage";
import Calendario from "./pages/Calendario";
import ClasePage from "./pages/ClasePage";
import NavBarClase from "./components/NavBarClase";
import AlumnosPage from "./pages/AlumnosPage";
import ActividadPage from "./pages/ActividadPage";
import AsistenciaPage from "./pages/AsistenciaPage";
import CalificacionPage from "./pages/CalificacionPage";
import UserPage from "./pages/UserPage";
import ClientesPage from "./pages/ClientesPage";
import AdminPage from "./pages/AdminPage";
import UsersPage from "./pages/UsersPage";

function AppRoutes() {
	return (
		<main className="min-h-screen">
			<Routes>
				{/* Rutas Publicas */}
				<Route
					path="/"
					element={
						<Layout>
							<HomePage />
						</Layout>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* Rutas protegidas para usuarios logeados */}
				<Route element={<ProtectedRoute />}>
					<Route
						path="/clases"
						element={
							<Layout>
								<ClasesPage />
							</Layout>
						}
					/>

					<Route
						path="/clase"
						element={
							<Layout>
								<NavBarClase />
								<ClasePage />
							</Layout>
						}
					/>

					<Route
						path="/calendario"
						element={
							<Layout>
								<Calendario />
							</Layout>
						}
					/>
					<Route
						path="/alumnos"
						element={
							<Layout>
								<NavBarClase /> <AlumnosPage />
							</Layout>
						}
					/>
					<Route
						path="/actividades"
						element={
							<Layout>
								<NavBarClase /> <ActividadPage />
							</Layout>
						}
					/>
					<Route
						path="/asistencia"
						element={
							<Layout>
								<NavBarClase /> <AsistenciaPage />
							</Layout>
						}
					/>
					<Route
						path="/calificaciones"
						element={
							<Layout>
								<NavBarClase /> <CalificacionPage />
							</Layout>
						}
					/>

					<Route
						path="/actividad-calificaciones"
						element={
							<Layout>
								<NavBarClase />
							</Layout>
						}
					/>
					{/* <Route
						path="/clase/config"
						element={
							<Layout>
								<NavBarClase />
								<ClasePage />
								<ClaseConfigPage />
							</Layout>
						}
					/> */}
					<Route
						path="/user"
						element={
							<Layout>
								<UserPage />
							</Layout>
						}
					/>

					<Route
						path="/clientes"
						element={
							<Layout>
								<ClientesPage />
							</Layout>
						}
					/>

					<Route
						path="/admin"
						element={
							<Layout>
								<AdminPage />
							</Layout>
						}
					/>
					<Route
						path="/users"
						element={
							<Layout>
								<UsersPage />
							</Layout>
						}
					/>
					{/* <Route path="/clientes" element={<h1>Clientes Page</h1>} /> */}
					{/* <Route path="/ejemplo" element={<EjemploPage />} /> */}
				</Route>
				{/* <Route path="*" element={<Navigate to="/" />} /> */}
			</Routes>
		</main>
	);
}

export default AppRoutes;
