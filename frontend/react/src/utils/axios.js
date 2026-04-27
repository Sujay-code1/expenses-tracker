import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Reads token from cookie and sends it as Authorization header
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1]
console.log("Token being sent:", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api;

