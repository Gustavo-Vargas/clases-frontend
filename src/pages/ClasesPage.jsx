import { useEffect, useState } from "react";
import { useClases } from "../context/ClasesContext";
import ClaseCard from "../components/ClaseCard";
import ClaseModal from "../components/modals/ClaseModal";

function ClasesPage() {
	const { getClases, clases } = useClases();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		getClases();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Función para abrir/cerrar modal
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	if (clases.length === 0) return <h1>No hay Clases para listar</h1>;

	return (
		<div className="p-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{clases.map((clase) => (
					<ClaseCard clase={clase} key={clase._id} />
				))}
			</div>
			{/* Botón para crear clase */}
			<div className="mt-6 flex justify-center">
				<button
					className="bg-primary dark:bg-darkSurface text-white px-6 py-2 rounded-md hover:bg-hover transition"
					onClick={toggleModal}
				>
					Crear Clase
				</button>
			</div>

			{/* Modal para formulario */}
			{isModalOpen && <ClaseModal onClose={toggleModal} />}
		</div>
	);
}

export default ClasesPage;
