import axios from "./axios";

// Llamada al api para obtener todas las Actividades
export const getListCalifActividadRequest = async (clase, actividad) =>
	axios.get(`/calif_activ`, { params: { clase, actividad } });

// Llamada al api para agregar una Actividad
export const createListCalifActividadRequest = (calificaciones) =>
	axios.post("/calif_activ", calificaciones);

// Llamada al api para agregar una Actividad
export const updateListCalifActividadRequest = (calificaciones) =>
	axios.put("/calif_activ", calificaciones);

