import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createActividadRequest,
	deleteActividadRequest,
	getActividadesRequest,
	updateActividadRequest,
} from "../api/actividades";
import { useClases } from "./ClasesContext";

const ActividadesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useActividad = () => {
	const context = useContext(ActividadesContext);
	if (!context) {
		throw new Error("useActividad debe estar definido en un contexto");
	}
	return context;
};

export function ActividadesProvider({ children }) {
	const [actividades, setActividades] = useState([]);
	const [errors, setErrors] = useState([]);
	const { clase } = useClases();

	// Función para crear un alumno
	const createActividad = async (actividad) => {
		try {
			await createActividadRequest(actividad);
			getActividades();
			return true;
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
			return false;
		}
	};

	// Función para obtener el listado de las calses
	const getActividades = async () => {
		try {
			const res = await getActividadesRequest(clase);
            console.log(res.data);
            
			setActividades(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para eliminar un alumno
	const deleteActividad = async (id) => {
		try {
			console.log("Entre a delete acticidad");

			const res = await deleteActividadRequest(id);
			console.log(res.data);
			if (res.status === 200)
				setActividades(actividades.filter((acticidad) => acticidad._id != id));
		} catch (error) {
			console.log(error);
		}
	};

	// Función para editar un alumno
	const updateActividad = async (acticidad) => {
		try {
			await updateActividadRequest(acticidad);
			getActividades();
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
		<ActividadesContext.Provider
			value={{
				actividades,
				createActividad,
				getActividades,
				deleteActividad,
				updateActividad,
				errors,
			}}
		>
			{children}
		</ActividadesContext.Provider>
	);
}

ActividadesProvider.propTypes = {
	children: PropTypes.any,
};
