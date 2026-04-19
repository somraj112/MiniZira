import axios from "axios";

const baseURL = import.meta.env.MODE === "development"
  ? "/api"
  : "https://minizira.onrender.com/api";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || baseURL,
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;