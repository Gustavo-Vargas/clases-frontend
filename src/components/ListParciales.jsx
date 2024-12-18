import { useEffect, useState } from "react";
import { useParciales } from "../context/ParcialesContext";
import ParcialModal from "./modals/ParcialModal";
import { useClases } from "../context/ClasesContext";

function ListParciales() {
	const { getParciales, parciales, deleteParcial } = useParciales();
	const { idClase } = useClases();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedParcial, setSelectedParcial] = useState(null);

	// Función para abrir/cerrar modal
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) setSelectedParcial(null); // Reiniciar los datos
	};

	// Función para abrir el modal en modo "Actualizar"
	const handleEditParcial = (parcial) => {
		setSelectedParcial(parcial); // Guardar los datos seleccionados
		setIsModalOpen(true); // Abrir modal
	};

	useEffect(() => {
		getParciales(idClase);
	}, [idClase]);

	return (
		<>
			{/* Título con botón de agregar */}
			<header className="bg-surface dark:bg-darkSurface p-4 -mb-2 rounded-lg shadow-md border border-border dark:border-darkBorder">
				<div className="flex items-center justify-between">
					<div className="mr-4">
						<h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
							Parcial
						</h1>
						<p className="text-textSecondary dark:text-darkTextSecondary">
							Aquí puedes gestionar los Parciales de la clase.
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
					Lista de Parciales
				</h2>

				{parciales.length === 0 ? (
					<p className="text-textSecondary dark:text-darkTextSecondary">
						No hay parciales disponibles.
					</p>
				) : (
					<ul className="space-y-3">
						{parciales.map((parcial) => (
							<li
								key={parcial._id}
								className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center shadow-sm"
							>
								<div>
									<p className="text-textPrimary dark:text-darkTextPrimary font-medium">
										{parcial.nombre}
									</p>
								</div>

								<div>
									<button
										className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
										onClick={() => handleEditParcial(parcial)}
									>
										Editar
									</button>
									<button
										className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
										onClick={() => {
											deleteParcial(parcial._id);
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
				<ParcialModal
					onClose={toggleModal}
					titulo={selectedParcial ? "Actualizar" : "Registrar"}
					parcial={selectedParcial} // Pasar datos selecionados
				/>
			)}
		</>
	);
}

export default ListParciales;
