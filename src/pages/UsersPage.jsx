import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que este contexto devuelve los usuarios con rol 'true'
import UserModal from "../components/modals/UserModal";

function UsersPage() {
	const { getUsers, users, deleteUser, updateUser } = useAuth(); // Asegúrate de que 'users' contiene los usuarios con rol 'true'

	// Estado para los usuarios
	const [usuarios, setUsuarios] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false); // Controlar apertura del modal
	const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Usuario para editar

	// Cargar los usuarios al montar el componente
	useEffect(() => {
		getUsers(); // Esto debe llenar 'users' con los datos de la API
	}, []);

	useEffect(() => {
		if (users) {
			// Filtra los usuarios con rol 'true' y actualiza el estado
			setUsuarios(users.filter((user) => user.rol === true));
		}
	}, [users]); // Este useEffect se ejecuta cuando 'users' cambia

	// Función para agregar o editar un usuario
	const handleSaveUsuario = async (usuarioData) => {
		if (usuarioSeleccionado) {
			// Editar usuario
			const updatedUser = { ...usuarioSeleccionado, ...usuarioData };

			// Enviar la solicitud al backend para actualizar el usuario
			const success = await updateUser(updatedUser);

			if (success) {
				// Si la actualización fue exitosa, actualiza el estado local
				setUsuarios(
					usuarios.map((usuario) =>
						usuario._id === usuarioSeleccionado._id
							? { ...usuario, ...usuarioData }
							: usuario
					)
				);
			}
		} else {
			// Crear usuario
			const newUser = { ...usuarioData, rol: true, _id: Date.now() }; // Añadir nuevo usuario
			setUsuarios([...usuarios, newUser]);

			// Aquí deberías enviar `newUser` al backend para que se cree el usuario
			// Dependiendo de tu lógica de backend, también deberías incluir la contraseña
			// await createUser(newUser);
		}
		setIsModalOpen(false);
		setUsuarioSeleccionado(null);
	};

	// Función para eliminar un usuario
	const eliminarUsuario = async (id) => {
		const success = await deleteUser(id);

		if (success) {
			// Si la eliminación fue exitosa, actualiza el estado local
			setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
		}
	};

	// Función para abrir el modal en modo "Crear"
	const abrirModalCrear = () => {
		setUsuarioSeleccionado(null); // No hay usuario seleccionado
		setIsModalOpen(true);
	};

	// Función para abrir el modal en modo "Editar"
	const abrirModalEditar = (usuario) => {
		setUsuarioSeleccionado(usuario); // Usuario a editar
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen bg-background dark:bg-darkBackground p-6">
			<h1 className="text-3xl font-bold mb-6 text-primary dark:text-darkTextPrimary">
				Gestión de Usuarios (Rol: True)
			</h1>

			{/* Botón para abrir modal de creación */}
			<button
				onClick={abrirModalCrear}
				className="bg-primary text-white py-2 px-4 rounded-md mb-6"
			>
				Crear Nuevo Usuario
			</button>

			{/* Tabla de usuarios con rol 'true' */}
			<div className="overflow-x-auto">
				<table className="w-full table-auto bg-white dark:bg-darkSurface shadow-md rounded-lg overflow-hidden">
					<thead>
						<tr className="bg-primary text-white">
							<th className="p-3 text-left">ID</th>
							<th className="p-3 text-left">Nombre</th>
							<th className="p-3 text-left">Email</th>
							<th className="p-3 text-left">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{usuarios.length > 0 ? (
							usuarios.map((usuario) => (
								<tr
									key={usuario._id}
									className="hover:bg-gray-100 dark:hover:bg-darkHover"
								>
									<td className="p-3 border-b dark:border-darkBorder">
										{usuario._id}
									</td>
									<td className="p-3 border-b dark:border-darkBorder">
										{usuario.username}
									</td>
									<td className="p-3 border-b dark:border-darkBorder">
										{usuario.email}
									</td>
									<td className="p-3 border-b dark:border-darkBorder">
										<button
											onClick={() => abrirModalEditar(usuario)}
											className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2"
										>
											Modificar
										</button>
										<button
											onClick={() => eliminarUsuario(usuario._id)}
											className="bg-red-500 text-white py-1 px-2 rounded-md"
										>
											Eliminar
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4" className="p-3 text-center">
									No se encontraron usuarios con rol TRUE.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Modal para crear o editar usuario */}
			<UserModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				usuario={usuarioSeleccionado}
				onSave={handleSaveUsuario}
			/>
		</div>
	);
}

export default UsersPage;
