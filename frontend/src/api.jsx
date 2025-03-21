import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getJobs = () => API.get("/jobs");
export const applyJob = (id) => API.post(`/jobs/${id}/apply`);
export const addJob = (data) => API.post("/jobs/add", data);


export const API_URL = "http://localhost:5000";
