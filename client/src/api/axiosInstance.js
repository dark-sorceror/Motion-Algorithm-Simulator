import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_EXPRESS_API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response || error.message);
        
        return Promise.reject(error);
    }
);

export default axiosInstance;