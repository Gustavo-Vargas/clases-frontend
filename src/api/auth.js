import axios from "./axios";

export const registerAdminRequest = (user) => axios.post("/registerAdmin", user);

export const registerRequest = (user) => axios.post("/register", user);

export const loginRequest = (user) => axios.post("/login", user);

export const verifyTokenRequest = () => axios.get("/verify");

export const logoutRequest = () => axios.post("/logout");

// Llamada al api para obtener todas los usuarios
export const getUsersRequest = () => axios.get("/users");

// Llamada al api para eliminar una user
export const deleteUserRequest = (id) => axios.delete("/users/" + id);

// Llamada al api para editar una user
export const updateUserRequest = (user) =>
	axios.put(`/users/${user._id}`, user);