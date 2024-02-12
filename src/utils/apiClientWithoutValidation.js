// axios 요청을 할 때 헤더에 토큰을 실어서 보내도록 함
// 토큰의 유효성 검사를 진행하지 않음
import axios from "axios";

const API_URL = import.meta.env.VITE_SPRING_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("jwtToken");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
