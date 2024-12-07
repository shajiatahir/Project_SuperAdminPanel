import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Configure axios to include credentials and token
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Create a new admin
export const createAdmin = async (adminData) => {
    try {
        const response = await api.post('/super-admin/create-admin', adminData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get all admins
export const getAdmins = async () => {
    try {
        const response = await api.get('/super-admin/admins');
        return response.data.admins;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete an admin
export const deleteAdmin = async (adminId) => {
    try {
        const response = await api.delete(`/super-admin/admin/${adminId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 