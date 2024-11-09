import axiosInstance from "./axiosInstance";

export const fetchData = async (data) => {
    try {
        const response = await axiosInstance.post('/data', data);
        return response.data
    } catch (error) {
        console.error('Error fetching data from /data', error);
        throw error;
    }
};

export const postData = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error in POST request:', error.response || error.message);
        throw error;
    }
};