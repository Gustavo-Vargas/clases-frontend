import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createCriterioRequest,
	deleteCriterioRequest,
	getCriteriosRequest,
	updateCriterioRequest,
} from "../api/criterio";
import { useClases } from "./ClasesContext";

const CriteriosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCriterios = () => {
	const context = useContext(CriteriosContext);
	if (!context) {
		throw new Error("useCriterios debe estar definido en un contexto");
	}
	return context;
};

export function CriteriosProvider({ children }) {
	const [criterios, setCriterios] = useState([]);
	const [errors, setErrors] = useState([]);
	const { clase } = useClases();

	// Función para crear un Criterio
	const createCriterio = async (criterio) => {
		try {
			await createCriterioRequest(criterio);
			getCriterios(clase);
			return true;
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
			return false;
		}
	};

	// Función para obtener el listado de las calses
	const getCriterios = async (idClase) => {
		try {
			const res = await getCriteriosRequest(idClase);
			setCriterios(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para eliminar un Criterio
	const deleteCriterio = async (id) => {
		try {
			console.log("Entre a delete Criterio");

			const res = await deleteCriterioRequest(id);
			console.log(res.data);
			if (res.status === 200)
				setCriterios(criterios.filter((criterio) => criterio._id != id));
		} catch (error) {
			console.log(error);
		}
	};

	// Función para editar un Criterio
	const updateCriterio = async (criterio) => {
		try {
			await updateCriterioRequest(criterio);
			getCriterios(clase);
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
		<CriteriosContext.Provider
			value={{
				criterios,
				createCriterio,
				getCriterios,
				deleteCriterio,
				updateCriterio,
				errors,
			}}
		>
			{children}
		</CriteriosContext.Provider>
	);
}

CriteriosProvider.propTypes = {
	children: PropTypes.any,
};
