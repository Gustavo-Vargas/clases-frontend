// components/ConfirmDeleteModal.js

import PropTypes from "prop-types";


function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
	if (!isOpen) return null; // Si no está abierto, no renderizar el modal

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-xl font-semibold text-gray-800">Confirmar Eliminación</h2>
				<p className="mt-2 text-gray-600">¿Estás seguro de que quieres eliminar esta clase? Esto eliminará todos los datos relacionados.</p>
				<div className="mt-4 flex justify-end">
					<button
						className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
						onClick={onConfirm} // Llama a la función de confirmación
					>
						Confirmar
					</button>
					<button
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
						onClick={onClose} // Cierra el modal
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmDeleteModal;

ConfirmDeleteModal.propTypes = {
    isOpen: PropTypes.any,
    onClose: PropTypes.any,
    onConfirm: PropTypes.any,
};
