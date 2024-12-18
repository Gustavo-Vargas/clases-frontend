// AlumnosPage.jsx
import { useEffect, useState } from "react";
import AlumnoModal from "../components/modals/AlumnoModal";
import { useAlumnos } from "../context/AlumnosContext";
import AlumnosTable from "../components/tables/AlumnosTable";

function AlumnosPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAlumno, setSelectedAlumno] = useState(null);
	const { alumnos, getAlumnos, deleteAlumno } = useAlumnos();

	// Función para abrir/cerrar modal
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) setSelectedAlumno(null); // Reiniciar el alumno seleccionado
	};

	useEffect(() => {
		getAlumnos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Función para abrir el modal en modo "Actualizar"
	const handleEditAlumno = (alumno) => {
		setSelectedAlumno(alumno); // Guardar el alumno seleccionado
		setIsModalOpen(true); // Abrir modal
	};

	return (
		<div className="p-6">
			<header className="bg-surface dark:bg-darkSurface p-4 rounded-lg shadow-md border border-border dark:border-darkBorder">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
							Lista de Alumnos
						</h1>
						<p className="text-textSecondary dark:text-darkTextSecondary">
							Aquí puedes gestionar los alumnos inscritos en esta clase.
						</p>
					</div>
					<button
						type="button"
						className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
						onClick={toggleModal}
					>
						Agregar Alumno
					</button>
				</div>
			</header>

			{/* Tabla de alumnos */}
			<AlumnosTable
				alumnos={alumnos}
				handleEditAlumno={handleEditAlumno}
				deleteAlumno={deleteAlumno}
			/>

			{/* Modal para formulario */}
			{isModalOpen && (
				<AlumnoModal
					onClose={toggleModal}
					titulo={selectedAlumno ? "Actualizar" : "Registrar"}
					alumno={selectedAlumno} // Pasar datos del alumno seleccionado
				/>
			)}
		</div>
	);
}

export default AlumnosPage;
