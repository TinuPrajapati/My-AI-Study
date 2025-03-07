import axios from "axios";

const Instance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : `/api`,
    withCredentials: true
});

export default Instance;