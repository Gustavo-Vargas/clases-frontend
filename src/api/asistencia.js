import axios from "./axios";

// Llamada al api para obtener todos los dias de asistencia
export const getDiasRequest = async (clase) =>
	axios.get(`/asistencias/dias`, { params: { clase } });

