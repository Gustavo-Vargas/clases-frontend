import { Link } from "react-router-dom";
import homeImg from "../assets/home.svg";

function HomePage() {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			{/* Contenedor de la ventana promocional */}
			<div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
				<div className="text-center">
					{/* Título de la promoción */}
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						¡Bienvenido a nuestra aplicación!
					</h2>

					{/* Descripción */}
					<p className="text-gray-600 text-lg mb-6">
						Únete a nuestra plataforma para disfrutar de funcionalidades
						avanzadas que te ayudarán a gestionar tus clases de manera más
						eficiente.
					</p>

					{/* Imagen de promoción (puedes añadir una imagen si lo deseas) */}
					<img src={homeImg} alt="Promoción" className="mx-auto mb-6" />

					{/* Botones para registrarse e iniciar sesión */}
					<div className="flex justify-center space-x-4">
						<Link
							to="/login"
							className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
						>
							Regístrate
						</Link>
						<Link
							to="/register"
							className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
						>
							Iniciar sesión
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
