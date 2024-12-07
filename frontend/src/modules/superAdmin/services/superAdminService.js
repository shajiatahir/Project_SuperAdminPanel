import axios from 'axios';
import config from '../../../config';

class SuperAdminService {
    constructor() {
        this.api = axios.create({
            baseURL: `${config.apiUrl}/super-admin`,
            withCredentials: true
        });

        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        });

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('API Error:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async createAdmin(adminData) {
        const response = await this.api.post('/admins', adminData);
        return response.data;
    }

    async getAllAdmins() {
        const response = await this.api.get('/admins');
        return response.data;
    }

    async deleteAdmin(adminId) {
        const response = await this.api.delete(`/admins/${adminId}`);
        return response.data;
    }

    async getFinancialReport(startDate, endDate) {
        const response = await this.api.get('/financial-report', {
            params: { startDate, endDate }
        });
        return response.data;
    }

    async getDashboardStats() {
        const response = await this.api.get('/dashboard-stats');
        return response.data;
    }

    async createPromotion(promotionData) {
        const response = await this.api.post('/promotions', promotionData);
        return response.data;
    }

    async getPaymentsByDate(startDate, endDate) {
        const response = await this.api.get('/payments', {
            params: { startDate, endDate }
        });
        return response.data;
    }

    async getAllPromotions() {
        const response = await this.api.get('/promotions');
        return response.data;
    }

    async updatePromotion(id, promotionData) {
        const response = await this.api.put(`/promotions/${id}`, promotionData);
        return response.data;
    }

    async deletePromotion(id) {
        const response = await this.api.delete(`/promotions/${id}`);
        return response.data;
    }

    async getAllSubscriptions() {
        const response = await this.api.get('/subscriptions');
        return response.data;
    }

    async createSubscription(subscriptionData) {
        const response = await this.api.post('/subscriptions', subscriptionData);
        return response.data;
    }

    async updateSubscription(id, subscriptionData) {
        const response = await this.api.put(`/subscriptions/${id}`, subscriptionData);
        return response.data;
    }

    async deleteSubscription(id) {
        const response = await this.api.delete(`/subscriptions/${id}`);
        return response.data;
    }
}

export default new SuperAdminService(); 