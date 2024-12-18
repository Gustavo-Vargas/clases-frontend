import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function UserModal({ isOpen, onClose, usuario, onSave }) {
	const [formData, setFormData] = useState({ username: "", email: "", password: "" });

	// Llenamos el formulario con los datos del usuario si es para editar
	useEffect(() => {
		if (usuario) {
			setFormData({ username: usuario.username, email: usuario.email, password: "" }); // No mostrar contraseña si se edita
		}
	}, [usuario]);

	const handleSubmit = () => {
		onSave(formData);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-md shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4">
					{usuario ? "Editar Usuario" : "Crear Usuario"}
				</h2>
				<input
					type="text"
					placeholder="Nombre de usuario"
					value={formData.username}
					onChange={(e) =>
						setFormData({ ...formData, username: e.target.value })
					}
					className="w-full p-2 mb-4 border border-gray-300 rounded-md"
				/>
				<input
					type="email"
					placeholder="Email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					className="w-full p-2 mb-4 border border-gray-300 rounded-md"
				/>
				{/* Campo para la contraseña */}
				<input
					type="password"
					placeholder="Contraseña"
					value={formData.password}
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					className="w-full p-2 mb-4 border border-gray-300 rounded-md"
					required={!usuario} // Requerir contraseña solo si es un nuevo usuario
				/>
				<div className="flex justify-end space-x-4">
					<button
						onClick={onClose}
						className="bg-gray-500 text-white py-1 px-4 rounded-md"
					>
						Cancelar
					</button>
					<button
						onClick={handleSubmit}
						className="bg-blue-500 text-white py-1 px-4 rounded-md"
					>
						{usuario ? "Actualizar" : "Crear"}
					</button>
				</div>
			</div>
		</div>
	);
}

UserModal.propTypes = {
	isOpen: PropTypes.any,
	onClose: PropTypes.any,
	usuario: PropTypes.any,
	onSave: PropTypes.any,
};

export default UserModal;
