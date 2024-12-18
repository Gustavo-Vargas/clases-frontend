import axios from "./axios";

// Llamada al api para obtener todas las Actividades
export const getCalifParcialRequest = async (clase) =>
	axios.get(`/calif_parcial`, { params: { clase } });

// Llamada al api para agregar una Actividad
export const createCalifParcialRequest = (parcial) =>
	axios.post("/calif_parcial", parcial);
