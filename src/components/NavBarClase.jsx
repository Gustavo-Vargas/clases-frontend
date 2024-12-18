import { Link } from "react-router-dom";
import iconConfig from "../assets/iconConfig.svg";

function NavBarClase() {
	return (
		<nav
			className="px-6 py-4 flex items-center justify-between bg-surface shadow-md
                    dark:bg-darkBorder text-textPrimary dark:text-darkTextPrimary 
                    transition-colors dark:shadow-darkBackground"
		>
			<div className="space-x-6">
				<Link
					to="/alumnos"
					className="px-3 py-2 rounded-md hover:bg-primary hover:text-white 
                            dark:hover:bg-darkHover transition-colors"
				>
					Alumnos
				</Link>
				<Link
					to="/actividades"
					className="px-3 py-2 rounded-md hover:bg-primary hover:text-white 
                            dark:hover:bg-darkHover transition-colors"
				>
					Actividades
				</Link>
				<Link
					to="/asistencia"
					className="px-3 py-2 rounded-md hover:bg-primary hover:text-white 
                            dark:hover:bg-darkHover transition-colors"
				>
					Asistencia
				</Link>
				<Link
					to="/calificaciones"
					className="px-3 py-2 rounded-md hover:bg-primary hover:text-white 
                            dark:hover:bg-darkHover transition-colors"
				>
					Calificaciones
				</Link>
			</div>
			<div className="flex items-center space-x-4">
				<Link
					to="/clase"
					className="w-10 h-10 flex items-center justify-center rounded-full
                            hover:bg-primary dark:hover:bg-darkHover transition-colors"
				>
					<img src={iconConfig} alt="Configuración" className="h-5 w-5" />
				</Link>
			</div>
		</nav>
	);
}

export default NavBarClase;
