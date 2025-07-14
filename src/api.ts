// src/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // Change this to your backend URL
});

export default API;
