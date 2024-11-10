import axiosInstance from "./axiosInstance";

export const fetchData = async (data) => {
    try {
        const response = await axiosInstance.post('/data', data);
        return response.data
    } catch (error) {
        console.error('Error in FETCH request from /data', error);
        throw error;
    }
};

export const postData = async (data) => {
    try {
        const response = await axiosInstance.post('/data', data);
        return response.data;
    } catch (error) {
        console.error('Error in POST request to /data', error.response || error.message);
        throw error;
    }
};