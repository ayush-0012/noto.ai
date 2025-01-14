import axios from "axios";

const PORT = process.env.NEXT_PUBLIC_API_PORT;
const API_URL = `http://localhost:${PORT}`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
