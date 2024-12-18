import { Link } from "react-router-dom";

function AdminPage() {
	return (
		<div className="min-h-screen bg-background dark:bg-darkBackground p-6">
			<h1 className="text-3xl font-bold mb-6 text-primary dark:text-darkTextPrimary">
				Panel de Administración
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Tarjeta de gestión de usuarios */}
				<div className="bg-white dark:bg-darkSurface shadow-md rounded-lg p-5 hover:shadow-lg transition">
					<h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-darkTextPrimary">
						Gestión de Usuarios
					</h2>
					<p className="text-gray-600 dark:text-darkTextSecondary mb-4">
						Administra los usuarios registrados en el sistema.
					</p>
					<Link
						to="/users"
						className="inline-block bg-primary text-white py-2 px-4 rounded-md hover:bg-hover transition"
					>
						Ir a Usuarios
					</Link>
				</div>

				{/* Tarjeta de gestión de clientes */}
				<div className="bg-white dark:bg-darkSurface shadow-md rounded-lg p-5 hover:shadow-lg transition">
					<h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-darkTextPrimary">
						Gestión de Clientes
					</h2>
					<p className="text-gray-600 dark:text-darkTextSecondary mb-4">
						Administra la información de tus clientes.
					</p>
					<Link
						to="/clientes"
						className="inline-block bg-primary text-white py-2 px-4 rounded-md hover:bg-hover transition"
					>
						Ir a Clientes
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AdminPage;
