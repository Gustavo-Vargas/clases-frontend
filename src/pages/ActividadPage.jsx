import { useEffect, useState } from "react";
import ActividadesTable from "../components/tables/ActividadesTable";
import { useActividad } from "../context/ActividadContext";
import ActividadModal from "../components/modals/ActividadModal";
import ListActivCalifs from "../components/ListActivCalifs";
import { useCalifActiv } from "../context/CalifActivContext";
import { useAlumnos } from "../context/AlumnosContext";
// import { useCalifActiv } from "../context/CalifActivContext";

function ActividadPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedActividad, setSelectedActividad] = useState(null);
	const [showCalificaciones, setShowCalificaciones] = useState(false); // Nuevo estado para controlar el cambio entre vista de tabla y calificaciones
	const { actividades, getActividades, deletectividad } = useActividad();
	const { clearListCalif } = useCalifActiv();
	const { getAlumnos, alumnos } = useAlumnos();

	// const { clearListCalif } = useCalifActiv();

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) setSelectedActividad(null);
	};

	useEffect(() => {
		getActividades();
		getAlumnos();
	}, []);

	const handleEditActividad = (actividad) => {
		setSelectedActividad(actividad);
		setIsModalOpen(true);
	};

	const handleViewCalificaciones = (actividad) => {
		setSelectedActividad(actividad); // Asignamos la actividad seleccionada
		setShowCalificaciones(true); // Mostramos la sección de calificaciones
	};

	// Función para ocultar la vista de calificaciones y volver a mostrar la tabla
	const handleBackToTable = () => {
		setShowCalificaciones(false);
		setSelectedActividad(null);
		clearListCalif();
	};

	return (
		<div className="p-6">
			{/* Condicional para mostrar la tabla o la lista de calificaciones */}
			{!showCalificaciones ? (
				<>
					<header className="bg-surface dark:bg-darkSurface p-4 rounded-lg shadow-md border border-border dark:border-darkBorder">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
									Lista de Actividades
								</h1>
								<p className="text-textSecondary dark:text-darkTextSecondary">
									Aquí puedes gestionar las actividades de esta clase.
								</p>
							</div>
							<button
								type="button"
								className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
								onClick={toggleModal}
							>
								Agregar Actividad
							</button>
						</div>
					</header>
					<ActividadesTable
						actividades={actividades}
						handleEditActividad={handleEditActividad}
						deleteActividad={deletectividad}
						viewActividad={handleViewCalificaciones}
					/>
				</>
			) : (
				<div className="grid justify-center">
					{/* Mostrar la lista de calificaciones de los alumnos */}
					<button
						onClick={handleBackToTable}
						className="m-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
					>
						Volver a actividades
					</button>

					{alumnos.length > 0 ? (
						<ListActivCalifs actividad={selectedActividad} />
					) : (
						<p className="text-gray-600">
							No hay alumnos registrados para esta actividad.
						</p>
					)}
				</div>
			)}

			{/* Modal para formulario */}
			{isModalOpen && (
				<ActividadModal
					onClose={toggleModal}
					titulo={selectedActividad ? "Actualizar" : "Registrar"}
					actividad={selectedActividad}
				/>
			)}
		</div>
	);
}

export default ActividadPage;
