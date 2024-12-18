import axios from "./axios";

// Llamada al api para obtener todas las Criterios
export const getCriteriosRequest = async (clase) =>
	axios.get(`/criterio`, { params: { clase } });

// Llamada al api para obtener una Criterio por id
export const getCriterioRequest = (id) => axios.get("/criterio/" + id);

// Llamada al api para agregar una Criterio
export const createCriterioRequest = (criterios) =>
	axios.post("/criterio", criterios);

// Llamada al api para eliminar una Criterio
export const deleteCriterioRequest = (id) => axios.delete("/criterio/" + id);

// Llamada al api para editar una Criterio
export const updateCriterioRequest = (criterios) =>
	axios.put(`/criterio/${criterios._id}`, criterios);
