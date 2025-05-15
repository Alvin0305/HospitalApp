import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: baseURL });

export const registerPatient = (userData) => API.post("/auth/patient/register", userData);
export const loginPatient = (userData) => API.post("/auth/patient/login", userData);
export const fetchUsers = () => API.get("/user");
