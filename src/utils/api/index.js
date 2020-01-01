import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : "http://localhost:4000/v1", // <- ENV variable
});

export default apiClient;