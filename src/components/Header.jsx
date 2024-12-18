import logoImg from "../assets/logo.jpg";
import iconUser from "../assets/iconUser.svg";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

function Header() {
	const { user, logout, isAuthenticated } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null); // Referencia al menú desplegable

	// Función para alternar el menú
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	// Cerrar el menú al hacer clic fuera de él
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav
			className="bg-gradient-to-r from-primary to-secondary 
                shadow-md px-6 py-4 flex items-center justify-between
                dark:from-darkSurface dark:to-darkBackground dark:shadow-darkBackground"
		>
			<div className="flex items-center space-x-3">
				<img
					src={logoImg}
					alt="Logo del Proyecto"
					className="h-10 rounded-full"
				/>
				<span className="text-xl font-semibold text-surface dark:text-darkTextPrimary">
					Gestor de Clases
				</span>
			</div>

			{isAuthenticated ? (
				<>
					{/* Botones de navegación */}
					<div className="flex items-center space-x-6">
						{user.rol !== true && (
							<div className="flex items-center space-x-6">
								<Link
									to="/clases"
									className="text-surface text-lg font-bold hover:text-hover transition
                							dark:hover:text-secondary dark:text-darkTextPrimary"
								>
									Clases
								</Link>
								<Link
									to="/Calendario"
									className="text-surface text-lg font-bold hover:text-hover transition
                							dark:hover:text-secondary dark:text-darkTextPrimary"
								>
									Calendario
								</Link>
							</div>
						)}

						{/* Mostrar rutas adicionales si el rol es true */}
						{user.rol === true && (
							<>
								<Link
									to="/admin"
									className="text-surface text-lg font-bold hover:text-hover transition
                        		dark:hover:text-secondary dark:text-darkTextPrimary"
								>
									Admin
								</Link>
								<Link
									to="/users"
									className="text-surface text-lg font-bold hover:text-hover transition
                        		dark:hover:text-secondary dark:text-darkTextPrimary"
								>
									Users
								</Link>
								<Link
									to="/clientes"
									className="text-surface text-lg font-bold hover:text-hover transition
                        		dark:hover:text-secondary dark:text-darkTextPrimary"
								>
									Clientes
								</Link>
							</>
						)}
					</div>

					{/* Usuario */}
					<div className="flex items-center space-x-3">
						<span className="font-medium">{user.username}</span>

						<div className="relative" ref={menuRef}>
							<div
								className="w-8 h-8 bg-primary dark:bg-white rounded-full flex items-center justify-center cursor-pointer"
								onClick={toggleMenu}
							>
								<img
									src={iconUser}
									alt="Icono de Usuario"
									className="h-5 w-5"
								/>
							</div>

							{/* Menú Desplegable */}
							{isMenuOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-surface dark:bg-darkSurface shadow-lg rounded-md z-50">
									<ul className="py-2">
										<li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkBorder cursor-pointer">
											<Link to="/user" onClick={() => setIsMenuOpen(false)}>
												Usuario
											</Link>
										</li>
										<li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkBorder cursor-pointer">
											<ThemeToggle />
										</li>
										<li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkBorder cursor-pointer">
											<Link
												to="/"
												className="text-error"
												onClick={() => {
													logout();
													setIsMenuOpen(false);
												}}
											>
												Cerrar Sesión
											</Link>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</>
			) : (
				<>
					<div className="flex items-center space-x-3">
						<Link
							to="/login"
							className="bg-primary text-white font-semibold hover:bg-hover hover:font-bold px-4 py-1 rounded-sm"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="bg-secondary text-white font-semibold hover:bg-green-600 hover:font-bold px-4 py-1 rounded-sm"
						>
							Register
						</Link>
					</div>
				</>
			)}
		</nav>
	);
}

export default Header;
