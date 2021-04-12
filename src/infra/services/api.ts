import axios from "axios";

const api = axios.create({
  baseURL: "https://warehouse-backend.vercel.app/",
});

export default api;
