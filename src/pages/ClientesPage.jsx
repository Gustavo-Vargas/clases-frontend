import { useState, useEffect } from "react";
import { useMembresias } from "../context/MembresiaContext";

function ClientesPage() {
	const { getMembresias, membresias } = useMembresias();

	const [usuarios, setUsuarios] = useState([]);
	const [busqueda, setBusqueda] = useState("");

	useEffect(() => {
		const fetchMembresias = async () => {
			await getMembresias();
		};

		fetchMembresias();
	}, []);

	useEffect(() => {
		if (membresias.length > 0) {
			const usuariosTransformados = membresias.map((membresia) => ({
				id: membresia._id,
				nombre: membresia.user.username,
				email: membresia.user.email,
				membresia: membresia.estado,
			}));
			setUsuarios(usuariosTransformados);
		}
	}, [membresias]);

	const usuariosFiltrados = usuarios.filter((usuario) =>
		usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-background dark:bg-darkBackground p-6">
			<h1 className="text-3xl font-bold mb-6 text-primary dark:text-darkTextPrimary">
				Lista de Clientes
			</h1>

			<input
				type="text"
				placeholder="Buscar por nombre..."
				className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-darkSurface dark:text-darkTextPrimary"
				value={busqueda}
				onChange={(e) => setBusqueda(e.target.value)}
			/>

			<div className="overflow-x-auto">
				<table className="w-full table-auto bg-white dark:bg-darkSurface shadow-md rounded-lg overflow-hidden">
					<thead>
						<tr className="bg-primary text-white">
							<th className="p-3 text-left">ID</th>
							<th className="p-3 text-left">Nombre</th>
							<th className="p-3 text-left">Email</th>
							<th className="p-3 text-left">Membresía</th>
						</tr>
					</thead>
					<tbody>
						{usuariosFiltrados.length > 0 ? (
							usuariosFiltrados.map((usuario) => (
								<tr
									key={usuario.id}
									className="hover:bg-gray-100 dark:hover:bg-darkHover"
								>
									<td className="p-3 border-b dark:border-darkBorder">
										{usuario.id}
									</td>
									<td className="p-3 border-b dark:border-darkBorder">
										{usuario.nombre}
									</td>
									<td className="p-3 border-b dark:border-darkBorder">
										{usuario.email}
									</td>
									<td className="p-3 border-b dark:border-darkBorder">
										{usuario.membresia}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4" className="p-3 text-center">
									No se encontraron usuarios.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ClientesPage;
