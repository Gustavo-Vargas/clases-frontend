import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createCalifParcialRequest,
	getCalifParcialRequest,
} from "../api/calif_parcial";
import { useClases } from "./ClasesContext";

const CalifParcialContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCalifParcial = () => {
	const context = useContext(CalifParcialContext);
	if (!context) {
		throw new Error("useCalifParcial debe estar definido en un contexto");
	}
	return context;
};

export function CalifParcialProvider({ children }) {
	const [listCalif, setListCalif] = useState([]);
	const [errors, setErrors] = useState([]);
	const { clase } = useClases();

	// Funcion para limpiar las lista de  calificaciones
	const clearListCalif = () => {
		setListCalif([]);
	};

	// Función para crear un alumno
	const createCalifParcial = async (parcial) => {
		try {
			console.log("ID del parcial", parcial);
			
			await createCalifParcialRequest(parcial);
			return true;
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
			return false;
		}
	};

	// Función para obtener el listado de las calses
	const getCalifParcial = async () => {
		try {
			const res = await getCalifParcialRequest(clase);
			console.log(res.data);

			setListCalif(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
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
		<CalifParcialContext.Provider
			value={{
				listCalif,
				createCalifParcial,
				getCalifParcial,
				errors,
				clearListCalif,
			}}
		>
			{children}
		</CalifParcialContext.Provider>
	);
}

CalifParcialProvider.propTypes = {
	children: PropTypes.any,
};
