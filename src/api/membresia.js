import axios from "./axios";

// Llamada al api para obtener todas las clases
export const getMembresiasRequest = () => axios.get("/membresia");

// Llamada al api para obtener una clase por id
export const getMembresiaRequest = (id) => axios.get("/membresia/" + id);

// Llamada al api para agregar una clase
export const createMembresiaRequest = (user) => axios.post("/membresia", user);

// Llamada al api para eliminar una clase
export const deleteMembresiaRequest = (id) => axios.delete("/membresia/" + id);

// Llamada al api para editar una clase
export const updateMembresiaRequest = (membresia) =>
	axios.put(`/membresia/${membresia._id}`, membresia);

