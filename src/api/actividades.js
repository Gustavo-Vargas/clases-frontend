import axios from "./axios";

// Llamada al api para obtener todas las Actividades
export const getActividadesRequest = async (clase) =>
	axios.get(`/actividades`, { params: { clase } });

// Llamada al api para obtener una Actividad por id
export const getActividadRequest = (id) => axios.get("/actividades/" + id);

// Llamada al api para agregar una Actividad
export const createActividadRequest = (actividad) =>
	axios.post("/actividades", actividad);

// Llamada al api para eliminar una Actividad
export const deleteActividadRequest = (id) =>
	axios.delete("/actividades/" + id);

// Llamada al api para editar una Actividad
export const updateActividadRequest = (actividad) =>
	axios.put(`/actividades/${actividad._id}`, actividad);
