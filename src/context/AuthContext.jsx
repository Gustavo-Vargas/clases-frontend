import { createContext, useState, useContext, useEffect } from "react";
import {
	registerRequest,
	loginRequest,
	verifyTokenRequest,
	logoutRequest,
	getUsersRequest,
	deleteUserRequest,
	updateUserRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth debe estar definido en un contexto");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(true);

	const signup = async (user) => {
		try {
			const res = await registerRequest(user);
			console.log(res);
			setUser(res.data); // Guardamos en user el usuario
			setIsAuthenticated(true);
			return res.data;
		} catch (error) {
			// Si existe un erro al registrar un usuario
			// Guardamos le error en la variable errors
			setErrors(error.response.data.message);
		}
	}; // Fin de signup

	const signin = async (user) => {
		try {
			const res = await loginRequest(user);
			// console.log(res.data);
			setUser(res.data); // Guardamos en user el usuario
			setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	}; // Fin de signin

	// Función para obtener el listado de las membresias
	const getUsers = async () => {
		try {
			const res = await getUsersRequest();
			setUsers(res.data);
			console.log(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para eliminar un alumno
	const deleteUser = async (id) => {
		try {
			console.log("Eliminando usuario...");

			// Enviar la solicitud al backend para eliminar el usuario
			const res = await deleteUserRequest(id);
			console.log(res.data);

			if (res.status === 200) {
				// Si la eliminación fue exitosa, elimina el usuario del estado local
				setUsers(users.filter((user) => user._id !== id));
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Función para editar un user
	const updateUser = async (user) => {
		try {
			// Enviar los datos actualizados al backend
			const res = await updateUserRequest(user);
			console.log(res.data);

			if (res.status === 200) {
				// Si la actualización fue exitosa, obtienes los usuarios actualizados
				getUsers();
			}
			return true;
		} catch (error) {
			console.error("Error actualizando usuario: ", error);
			return false;
		}
	};

	// Función para cerrar sesión
	const logout = () => {
		logoutRequest();
		Cookies.remove("token");
		setIsAuthenticated(false);
		setUser(null);
	}; // Fin de logout

	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	useEffect(() => {
		async function checLogin() {
			const cookies = Cookies.get();
			// console.log(cookies.token);
			if (!cookies.token) {
				// SI no hay un cookie que contenga el token
				setIsAuthenticated(false); // El usuario no está autenticado
				setLoading(false); // No hay cookie y ya no se cargan los datos
				// Establecemos los datos del usuario en null
				return setUser(null);
			} // FIn de !cookies.token

			try {
				// EN caso de que si exista un token lo verificamos
				const res = await verifyTokenRequest(cookies.token);
				if (!res.data) {
					// Si el servidor no responde con un token
					setIsAuthenticated(false); // El usuario no está autenticado
					setLoading(false);
					return;
				}

				// En caso de que si exista un token y se obtenga datos de respuesta
				setIsAuthenticated(true);
				setUser(res.data); // Establecemos los datos del usuario
				setLoading(false); // Terminó de cargar los datos dle usuario
			} catch (error) {
				console.log(error);
				setIsAuthenticated(false);
				setLoading(false);
				setUser(null);
			} // FIn del catch
		} // Fin de checkLogin

		checLogin();
	}, []); // Fin de useEffect

	return (
		<AuthContext.Provider
			value={{
				signup,
				signin,
				user,
				isAuthenticated,
				errors,
				loading,
				logout,
				getUsers,
				users,
				deleteUser,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}; // Fin de AuthProvider

AuthProvider.propTypes = {
	children: PropTypes.any,
};
