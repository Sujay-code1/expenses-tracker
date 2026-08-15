import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const normalizeToken = (value) => {
  if (!value || typeof value !== "string") return "";

  const trimmed = value.trim().replace(/^"|"$/g, "");
  const cleaned = trimmed.replace(/^Bearer\s+/i, "");

  return cleaned.includes(".") && cleaned.split(".").length === 3 ? cleaned : "";
};

api.interceptors.request.use((config) => {
  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const localToken = localStorage.getItem("token");
  const token = normalizeToken(cookieToken || localToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
    localStorage.removeItem("token");
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;

