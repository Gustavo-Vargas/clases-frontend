import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de tener el contexto de autenticación
import { useMembresias } from "../context/MembresiaContext";

function UserPage() {
	const { user } = useAuth(); // Suponiendo que `useAuth` retorna el objeto `user`
	const { membresia, getMembresia } = useMembresias();

	console.log("User", user);
	

	useEffect(() => {
		if (user) {
			getMembresia(user.id); // Obtener los datos de membresía cuando el usuario está disponible
		}
	}, []); // Dependemos de `user` y `getMembresia`

	if (!user) {
		return (
			<div className="flex justify-center items-center h-screen text-xl text-gray-600">
				Cargando...
			</div>
		); // Mensaje en caso de que los datos no estén disponibles aún
	}

	return (
		<div className="max-w-4xl mx-auto p-8 mt-2 bg-gray-50 rounded-xl shadow-lg">
			<h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
				Perfil del Usuario
			</h2>

			{/* Contenedor de la información del usuario */}
			<div className="bg-white p-6 rounded-lg shadow-md">
				<div className="mb-6 border-b pb-4">
					<h3 className="text-2xl font-semibold text-gray-800">
						Información Personal
					</h3>
					<div className="flex justify-between mt-4">
						<div>
							<strong className="text-gray-600">Nombre de Usuario:</strong>
							<p className="text-lg text-gray-800">{user.username}</p>
						</div>
						<div>
							<strong className="text-gray-600">Correo Electrónico:</strong>
							<p className="text-lg text-gray-800">{user.email}</p>
						</div>
					</div>
				</div>

				{/* Apartado de Membresía */}
				<div className="mb-6">
					<h3 className="text-2xl font-semibold text-gray-800">Membresía</h3>
					{membresia ? (
						<>
							<div className="my-4">
								<div>
									<strong className="text-gray-600">Estado:</strong>
									<p className="text-lg text-gray-800">{membresia.estado}</p>
								</div>
							</div>
							{/* Información adicional */}
							<div className="flex justify-between">
								<div>
									<strong className="text-gray-600">Fecha de Inicio:</strong>
									<p className="text-lg text-gray-800">
										{new Date(membresia.fecha_inicio).toLocaleDateString()}
									</p>
								</div>
								<div>
									<strong className="text-gray-600">Última Expiración:</strong>
									<p className="text-lg text-gray-800">
										{new Date(membresia.fecha_expiracion).toLocaleDateString()}
									</p>
								</div>
							</div>
						</>
					) : (
						<p className="text-lg text-gray-800">No tienes membresía activa.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default UserPage;
