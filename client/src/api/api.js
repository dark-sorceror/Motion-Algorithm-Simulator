import axiosInstance from "./axiosInstance";

export const fetchData = async (data) => {
    try {
        const response = await axiosInstance.get('/api', data);

        return response.data
    } catch (error) {
        console.error(`Error in FETCH request from ${process.env.REACT_APP_API_URL}/api`, error.response || error.message);
        
        throw error;
    }
};

export const postData = async (data) => {
    try {
        const response = await axiosInstance.post('/api', data);
        
        return response.data;
    } catch (error) {
        console.error(`Error in POST request to ${process.env.REACT_APP_API_URL}/api`, error.response || error.message);

        throw error;
    }
};