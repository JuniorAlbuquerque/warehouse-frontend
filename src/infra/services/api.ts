import axios from "axios";
import { BASE_API } from 'infra/config/api';
const api = axios.create({
  baseURL: BASE_API,
});

export default api;
