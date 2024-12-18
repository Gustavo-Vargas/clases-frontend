import { useEffect, useState } from "react";
import { useClases } from "../context/ClasesContext";
import ListCriterios from "../components/ListCriterios";
import ListParciales from "../components/ListParciales";
import ClaseModal from "../components/modals/ClaseModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function ClasePage() {
	const { idClase, getClase, clase, deleteClase } = useClases();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const navigate = useNavigate();

	// Función para abrir/cerrar modal
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	// Función para abrir/cerrar modal de confirmación
	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	// Función para confirmar y eliminar la clase
	const handleEliminarClase = () => {
		toggleDeleteModal(); // Abre el modal de confirmación
	};

	// Función que se llama cuando el usuario confirma la eliminación
	const confirmEliminarClase = () => {
		deleteClase(clase._id);
		toggleDeleteModal(); // Cierra el modal de confirmación
		navigate("/clases");
	};

	useEffect(() => {
		getClase(idClase);
	}, [idClase]);

	return (
		<div className="p-6">
			{/* Encabezado */}

			<header className="bg-surface dark:bg-darkSurface p-4 -mb-2 rounded-lg shadow-md border border-border dark:border-darkBorder">
				<div className="flex items-center justify-between">
					<div className="mr-4">
						<h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
							{clase.nombre}
						</h1>
						<p className="text-textSecondary dark:text-darkTextSecondary  text-sm">
							Horario: {clase.hora_inicio} - {clase.hora_fin}
						</p>
					</div>
					<button
						type="button"
						className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
						onClick={handleEliminarClase}
					>
						Eliminar
					</button>
				</div>
			</header>

			{/* Detalles de la clase */}
			<div className="mt-4 bg-surface dark:bg-darkSurface p-4 rounded-lg shadow-md border border-border dark:border-darkBorder">
				<div className="flex items-center justify-between">
					<div className="mr-4">
						<h2 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
							Detalles de la clase
						</h2>
						<p className="text-textSecondary dark:text-darkTextSecondary mt-2">
							<span className="font-medium">Descripción:</span>{" "}
							{clase.descripcion}
						</p>
						<p className="text-textSecondary dark:text-darkTextSecondary mt-2">
							<span className="font-medium">Fecha de inicio:</span>{" "}
							{new Date(clase.fecha_inicio).toLocaleDateString()}
						</p>
						<p className="text-textSecondary dark:text-darkTextSecondary mt-2">
							<span className="font-medium">Fecha de fin:</span>{" "}
							{new Date(clase.fecha_fin).toLocaleDateString()}
						</p>
						<p className="text-textSecondary dark:text-darkTextSecondary mt-2">
							<span className="font-medium">Días:</span>{" "}
							{clase.dias?.join(", ")}
						</p>
					</div>
					<button
						type="button"
						className="bg-primary dark:bg-darkSurface text-white px-6 py-2 rounded-md hover:bg-hover transition"
						onClick={toggleModal}
					>
						Editar
					</button>
				</div>
			</div>

			{/* Lista de criterios */}
			<div className="mt-6 grid grid-cols-2 justify-between ">
				<div className="mr-4">
					<ListCriterios idClase={idClase} />
				</div>
				<div>
					<ListParciales idClase={idClase} />
				</div>
			</div>

			{/* Modal para formulario */}
			{isModalOpen && <ClaseModal onClose={toggleModal} clase={clase} />}

			{/* Modal de confirmación */}
			<ConfirmDeleteModal
				isOpen={isDeleteModalOpen}
				onClose={toggleDeleteModal}
				onConfirm={confirmEliminarClase}
			/>
		</div>
	);
}

export default ClasePage;
