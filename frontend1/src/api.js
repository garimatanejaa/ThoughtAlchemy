import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5001/api",  // adjust to your backend URL
  headers: {
    Authorization: token ? `Bearer ${token}` : "",  // only set if token exists
  },
});

export default api;
