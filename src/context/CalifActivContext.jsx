import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createListCalifActividadRequest,
	getListCalifActividadRequest,
	updateListCalifActividadRequest,
} from "../api/calif_activ";
import { useClases } from "./ClasesContext";

const CalifActivContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCalifActiv = () => {
	const context = useContext(CalifActivContext);
	if (!context) {
		throw new Error("useCalifActiv debe estar definido en un contexto");
	}
	return context;
};

export function CalifActivProvider({ children }) {
	const [listCalif, setListCalif] = useState([]);
	const [errors, setErrors] = useState([]);
	const { clase } = useClases();

	// Funcion para limpiar las lista de  calificaciones
	const clearListCalif = () => {
		setListCalif([]);
	};

	// Función para crear un alumno
	const createCalifActividad = async (calificaciones) => {
		try {
			await createListCalifActividadRequest(calificaciones);
			// getCalifActividad();
			return true;
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
			return false;
		}
	};

	// Función para obtener el listado de las calses
	const getCalifActividad = async (actividad) => {
		try {
			const res = await getListCalifActividadRequest(clase, actividad);
			setListCalif(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para actualizar calificaicones
	const updateCalifActividad = async (calificaciones) => {
		try {
			console.log(calificaciones);
			
			await updateListCalifActividadRequest(calificaciones);
			// getCalifActividad();
			return true;
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
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
		<CalifActivContext.Provider
			value={{
				listCalif,
				createCalifActividad,
				getCalifActividad,
				updateCalifActividad,
				errors,
				clearListCalif,
			}}
		>
			{children}
		</CalifActivContext.Provider>
	);
}

CalifActivProvider.propTypes = {
	children: PropTypes.any,
};
