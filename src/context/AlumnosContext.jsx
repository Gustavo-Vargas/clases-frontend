import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	createAlumnoRequest,
	deleteAlumnoRequest,
	getAlumnosRequest,
	updateAlumnoRequest,
} from "../api/alumnos";
import { useClases } from "./ClasesContext";

const AlumnosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAlumnos = () => {
	const context = useContext(AlumnosContext);
	if (!context) {
		throw new Error("useAlumnos debe estar definido en un contexto");
	}
	return context;
};

export function AlumnosProvider({ children }) {
	const [alumnos, setAlumnos] = useState([]);
	const [errors, setErrors] = useState([]);
	const { clase } = useClases();

	// Función para crear un alumno
	const createAlumno = async (alumno) => {
		try {
			await createAlumnoRequest(alumno);
			getAlumnos();
			return true;
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
			return false;
		}
	};

	// Función para obtener el listado de las calses
	const getAlumnos = async () => {
		try {
			console.log(clase);
			
			const res = await getAlumnosRequest(clase);
			setAlumnos(res.data);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.message);
		}
	};

	// Función para eliminar un alumno
	const deleteAlumno = async (id) => {
		try {
			console.log("Entre a delete ALumno");

			const res = await deleteAlumnoRequest(id);
			console.log(res.data);
			if (res.status === 200)
				setAlumnos(alumnos.filter((alumno) => alumno._id != id));
		} catch (error) {
			console.log(error);
		}
	};

	// Función para editar un alumno
	const updateAlumno = async (alumno) => {
		try {
			await updateAlumnoRequest(alumno);
			getAlumnos();
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
		<AlumnosContext.Provider
			value={{
				alumnos,
				createAlumno,
				getAlumnos,
				deleteAlumno,
				updateAlumno,
				errors,
			}}
		>
			{children}
		</AlumnosContext.Provider>
	);
}

AlumnosProvider.propTypes = {
	children: PropTypes.any,
};
