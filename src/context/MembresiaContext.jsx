import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createMembresiaRequest,
	getMembresiasRequest,
	getMembresiaRequest,
	updateMembresiaRequest,
	deleteMembresiaRequest,
} from "../api/membresia";

const MembresiasContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMembresias = () => {
	const context = useContext(MembresiasContext);
	if (!context) {
		throw new Error("useMembresias debe estar definido en un contexto");
	}
	return context;
};

export function MembresiasProvider({ children }) {
	const [membresias, setMembresias] = useState([]);
	const [membresia, setMembresia] = useState([]);
	const [errors, setErrors] = useState([]);

	// Función para crear una membresia
	const createMembresia = async (user) => {
		try {
            console.log("entre a crear membresia", user);
            
			await createMembresiaRequest(user);
            console.log("termine de crear la membresia");
            
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para obtener el listado de las membresias
	const getMembresias = async () => {
		try {
			const res = await getMembresiasRequest();
			setMembresias(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para obtener una mebresia por id de la base de datos
	const getMembresia = async (id) => {
		try {
			const res = await getMembresiaRequest(id);
			setMembresia(res.data);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	};

	// Función para editar un clase
	const updateMembresia = async (clase) => {
		try {
			await updateMembresiaRequest(clase);
			getMembresia(clase._id);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	// Función para editar un clase
	const deleteMembresia = async (idClase) => {
		try {
			await deleteMembresiaRequest(idClase);
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
		<MembresiasContext.Provider
			value={{
				membresias,
				membresia,
				createMembresia,
				getMembresia,
				getMembresias,
				updateMembresia,
				deleteMembresia,
				errors,
			}}
		>
			{children}
		</MembresiasContext.Provider>
	);
}

MembresiasProvider.propTypes = {
	children: PropTypes.any,
};
