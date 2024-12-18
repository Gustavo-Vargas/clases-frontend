import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createClaseRequest,
	getCalendarioRequest,
	getClaseRequest,
	getClasesRequest,
	updateClaseRequest,
	deleteClaseRequest,
} from "../api/clases";

const ClasesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useClases = () => {
	const context = useContext(ClasesContext);
	if (!context) {
		throw new Error("useAuth debe estar definido en un contexto");
	}
	return context;
};

export function ClasesProvider({ children }) {
	const [clases, setClases] = useState([]);
	const [clase, setClase] = useState([]);
	const [idClase, setIdClase] = useState([]);
	const [calendario, setCalendario] = useState([]);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const localClase = localStorage.getItem("clase");
		if (localClase) {
			setIdClase(localClase);
		}
	}, []);

	const selectClase = (idClase) => {
		if (idClase) {
			setIdClase(idClase);
			localStorage.setItem("clase", idClase);
		}
	};

	// Función para crear una clase
	const createClase = async (clase) => {
		try {
			await createClaseRequest(clase);
			getClases();
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	}; // Fin de createClase

	// Función para obtener el listado de las calses
	const getClases = async () => {
		try {			
			const res = await getClasesRequest();
			setClases(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	}; // Fin de getClases

	// Función para obtener el listado del calendario por dias
	const getCalendario = async () => {
		try {
			const res = await getCalendarioRequest();
			setCalendario(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	}; // Fin de getCalendario

	// Función para obtener una clase por id de la base de datos
	const getClase = async (id) => {
		try {
			const res = await getClaseRequest(id);
			setClase(res.data);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	};

	// Función para editar un clase
	const updateClase = async (clase) => {
		try {
			await updateClaseRequest(clase);
			getClase(clase._id);
			// getClases();
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	// Función para editar un clase
	const deleteClase = async (idClase) => {
		try {
			await deleteClaseRequest(idClase);
			setIdClase([]);
			getClases();
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	return (
		<ClasesContext.Provider
			value={{
				clases,
				clase,
				createClase,
				getClases,
				getClase,
				errors,
				calendario,
				getCalendario,
				idClase,
				selectClase,
				updateClase,
				deleteClase,
			}}
		>
			{children}
		</ClasesContext.Provider>
	);
} // Fin de ClasesProvider

ClasesProvider.propTypes = {
	children: PropTypes.any,
};
