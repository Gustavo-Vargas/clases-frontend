import axios from "./axios";

// Llamada al api para obtener todas las clases
export const getClasesRequest = () => axios.get("/clases");

// Llamada al api para obtener una clase por id
export const getClaseRequest = (id) => axios.get("/clases/" + id);

// Llamada al api para agregar una clase
export const createClaseRequest = (clase) => axios.post("/clases", clase);

// Llamada al api para eliminar una clase
export const deleteClaseRequest = (id) => axios.delete("/clases/" + id);

// Llamada al api para editar una clase
export const updateClaseRequest = (clase) =>
	axios.put(`/clases/${clase._id}`, clase);

// Llamada al api para obtener el calendario
export const getCalendarioRequest = () => axios.get("/calendario");
