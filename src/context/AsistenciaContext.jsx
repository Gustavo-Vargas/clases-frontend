import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDiasRequest } from "../api/asistencia";
// import { useClases } from "./ClasesContext";

const AsistenciaContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAsistencia = () => {
	const context = useContext(AsistenciaContext);
	if (!context) {
		throw new Error("useAsistencia debe estar definido en un contexto");
	}
	return context;
};

export function AsistenciaProvider({ children }) {
	// const [asistencias, setAsistencias] = useState([]);
	const [dias, setDias] = useState([]);
	const [errors, setErrors] = useState([]);
	// const { clase } = useClases();

	// Función para crear un Criterio
	// const createAsistencia = async (criterio) => {
	// 	try {
	// 		await createCriterioRequest(criterio);
	// 		getCriterios(clase);
	// 		return true;
	// 	} catch (error) {
	// 		console.log(error);
	// 		setErrors(error.response.data.message);
	// 		return false;
	// 	}
	// };

	// Función para obtener el listado de las calses
	const getDias = async (idClase) => {
		try {
			const res = await getDiasRequest(idClase);
			setDias(res.data.fechas);
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
		<AsistenciaContext.Provider
			value={{
				// asistencias,
				dias,
				getDias,
				errors,
			}}
		>
			{children}
		</AsistenciaContext.Provider>
	);
}

AsistenciaProvider.propTypes = {
	children: PropTypes.any,
};
