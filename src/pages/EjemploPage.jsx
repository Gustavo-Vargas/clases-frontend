import ThemeToggle from "../components/ThemeToggle";

const EjemploPage = () => {
	return (
		<div className="bg-background dark:bg-darkBackground min-h-screen p-6">
			{/* Botón de cambio de tema */}
			<ThemeToggle />

			{/* Encabezado */}
			<header className="text-textPrimary dark:text-darkTextPrimary text-3xl font-bold mb-6">
				Gestión de Clases
			</header>

			{/* Tarjetas */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-surface dark:bg-darkSurface p-4 rounded-lg shadow-md border border-border dark:border-darkBorder">
					<h2 className="text-textPrimary dark:text-darkTextPrimary text-xl font-semibold">
						Clase 1
					</h2>
					<p className="text-textSecondary dark:text-darkTextSecondary mt-2">
						Descripción de la clase.
					</p>
					<button className="bg-primary text-white py-2 px-4 rounded mt-4 hover:bg-hover">
						Ver Detalles
					</button>
				</div>

				<div className="bg-surface dark:bg-darkSurface p-4 rounded-lg shadow-md border border-border dark:border-darkBorder">
					<h2 className="text-textPrimary dark:text-darkTextPrimary text-xl font-semibold">
						Clase 2
					</h2>
					<p className="text-textSecondary dark:text-darkTextSecondary mt-2">
						Descripción de la clase.
					</p>
					<button className="bg-secondary text-white py-2 px-4 rounded mt-4 hover:bg-hover">
						Editar Clase
					</button>
				</div>
			</div>

			{/* Alertas */}
			<div className="mt-6">
				<div className="bg-success text-white p-4 rounded mb-4">
					¡Éxito! Clase creada correctamente.
				</div>
				<div className="bg-error text-white p-4 rounded mb-4">
					Error: No se pudo crear la clase.
				</div>
				<div className="bg-warning text-white p-4 rounded mb-4">
					Advertencia: Faltan campos por llenar.
				</div>
				<div className="bg-info text-white p-4 rounded mb-4">
					Información: Revisa los horarios de tus clases.
				</div>
			</div>
		</div>
	);
};

export default EjemploPage;
