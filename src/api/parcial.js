import axios from "./axios";

// Llamada al api para obtener todas las Parcials
export const getParcialesRequest = async (clase) =>
	axios.get(`/parcial`, { params: { clase } });

// Llamada al api para obtener una Parcial por id
export const getParcialRequest = (id) => axios.get("/parcial/" + id);

// Llamada al api para agregar una Parcial
export const createParcialRequest = (parciales) =>
	axios.post("/parcial", parciales);

// Llamada al api para eliminar una Parcial
export const deleteParcialRequest = (id) => axios.delete("/parcial/" + id);

// Llamada al api para editar una Parcial
export const updateParcialRequest = (parciales) =>
	axios.put(`/parcial/${parciales._id}`, parciales);
