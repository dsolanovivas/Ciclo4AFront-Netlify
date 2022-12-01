import axios from "axios";

const BASE_URL = "https://ciclo4aback-production.up.railway.app/APIRESTCICLO4A";

const apiInstance = axios.create({ baseURL: BASE_URL });

export default apiInstance;
