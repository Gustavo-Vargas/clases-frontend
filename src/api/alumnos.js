import axios from "./axios";

// Llamada al api para obtener todas las Alumnos
// export const getAlumnosRequest = (clase) => axios.get("/alumnos", clase);

export const getAlumnosRequest = async (clase) =>
	axios.get(`/alumnos`, { params: { clase } });

// Llamada al api para obtener una Alumno por id
export const getAlumnoRequest = (id) => axios.get("/alumnos/" + id);

// Llamada al api para agregar una Alumno
export const createAlumnoRequest = (alumno) => axios.post("/alumnos", alumno);

// Llamada al api para eliminar una Alumno
export const deleteAlumnoRequest = (id) => axios.delete("/alumnos/" + id);

// Llamada al api para editar una Alumno
export const updateAlumnoRequest = (alumno) =>
	axios.put(`/alumnos/${alumno._id}`, alumno);
