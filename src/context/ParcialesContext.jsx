import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createParcialRequest,
	deleteParcialRequest,
	getParcialesRequest,
	updateParcialRequest,
} from "../api/parcial";
import { useClases } from "./ClasesContext";

const ParcialesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useParciales = () => {
	const context = useContext(ParcialesContext);
	if (!context) {
		throw new Error("useCriterios debe estar definido en un contexto");
	}
	return context;
};

export function ParcialesProvider({ children }) {
	const [parciales, setParciales] = useState([]);
	const [errors, setErrors] = useState([]);
	const { clase } = useClases();

	// Función para crear un Criterio
	const createParcial = async (criterio) => {
		try {
			await createParcialRequest(criterio);
			getParciales(clase);
			return true;
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
			return false;
		}
	};

	// Función para obtener el listado de las calses
	const getParciales = async (idClase) => {
		try {
			const res = await getParcialesRequest(idClase);
			setParciales(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para eliminar un Criterio
	const deleteParcial = async (id) => {
		try {
			const res = await deleteParcialRequest(id);
			if (res.status === 200)
				setParciales(parciales.filter((parcial) => parcial._id != id));
		} catch (error) {
			console.log(error);
		}
	};

	// Función para editar un Criterio
	const updateParcial = async (criterio) => {
		try {
			await updateParcialRequest(criterio);
			getParciales();
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
		<ParcialesContext.Provider
			value={{
				parciales,
				createParcial,
				getParciales,
				deleteParcial,
				updateParcial,
				errors,
			}}
		>
			{children}
		</ParcialesContext.Provider>
	);
}

ParcialesProvider.propTypes = {
	children: PropTypes.any,
};
