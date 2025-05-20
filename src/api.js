import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL: baseURL });

// auth
export const registerPatient = (userData) =>
  API.post("/auth/patient/register", userData);
export const loginPatient = (userData) =>
  API.post("/auth/patient/login", userData);

// users
export const fetchUsers = () => API.get("/user");
export const fetchContactedUsers = (id) => API.get(`/user/get/contacted/${id}`);
export const fetchAllUsers = () => API.get("/user");
export const fetchUserById = (id) => API.get(`/user/${id}`);

// messages and conversations
export const fetchConversationsBetween = (ids) =>
  API.post("/conversation/chat", ids);
export const fetchMessagesInConversation = (id) =>
  API.get(`/message/in-conversation/${id}`);
export const startConversation = (title) =>
  API.post("/conversation/start", title);
export const sendMessage = (message) => API.post("/message/send", message);
// doctors
export const fetchDoctors = () => API.get("/doctor");

// login logs
export const fetchLoginLogOfUser = (id) => API.get(`/loginlog/${id}`);
