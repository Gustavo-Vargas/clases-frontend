import { useEffect, useState } from "react";
import { useCriterios } from "../context/CriteriosContext";
import CriterioModal from "./modals/CriterioModal";
import { useClases } from "../context/ClasesContext";

function ListCriterios() {
	const { getCriterios, criterios, deleteCriterio } = useCriterios();
	const { idClase } = useClases();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCriterio, setSelectedCriterio] = useState(null); 

	// Función para abrir/cerrar modal
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) setSelectedCriterio(null); // Reiniciar el alumno seleccionado
	};

	// Función para abrir el modal en modo "Actualizar"
	const handleEditCriterio = (criterio) => {
		setSelectedCriterio(criterio); // Guardar el alumno seleccionado
		setIsModalOpen(true); // Abrir modal
	};

    // Calcular la suma actual de los porcentajes
	const totalPorcentaje = criterios.reduce((total, criterio) => total + criterio.porcentaje, 0);

	useEffect(() => {
		getCriterios(idClase);
	}, [idClase]);

	return (
		<>
			{/* Título con botón de agregar */}
			<header className="bg-surface dark:bg-darkSurface p-4 -mb-2 rounded-lg shadow-md border border-border dark:border-darkBorder">
				<div className="flex items-center justify-between">
					<div className="mr-4">
						<h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
							Criterios
						</h1>
						<p className="text-textSecondary dark:text-darkTextSecondary">
							Aquí puedes gestionar los criterios de la clase.
						</p>
					</div>
					<button
						type="button"
						className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
						onClick={toggleModal}
					>
						Agregar
					</button>
				</div>
			</header>
			<div className="bg-surface dark:bg-darkSurface p-4 rounded-lg shadow-md border border-border dark:border-darkBorder mt-4">
				<h2 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary mb-4">
					Lista de Criterios (Total: {totalPorcentaje}%)
				</h2>

				{criterios.length === 0 ? (
					<p className="text-textSecondary dark:text-darkTextSecondary">
						No hay criterios disponibles.
					</p>
				) : (
					<ul className="space-y-3">
						{criterios.map((criterio) => (
							<li
								key={criterio._id}
								className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center shadow-sm"
							>
								<div>
									<p className="text-textPrimary dark:text-darkTextPrimary font-medium">
										{criterio.nombre}
									</p>
									<p className="text-sm text-textSecondary dark:text-darkTextSecondary">
										Puntuación: {criterio.porcentaje}
									</p>
								</div>

								<div>
									<button
										className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
										onClick={() => handleEditCriterio(criterio)}
									>
										Editar
									</button>
									<button
										className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
										onClick={() => {
											deleteCriterio(criterio._id);
										}}
									>
										Eliminar
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			{/* Modal para formulario */}
			{isModalOpen && (
				<CriterioModal
					onClose={toggleModal}
					titulo={selectedCriterio ? "Actualizar" : "Registrar"}
					criterio={selectedCriterio} // Pasar datos del alumno seleccionado
				/>
			)}
		</>
	);
}

export default ListCriterios;
