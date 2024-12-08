import axios from 'axios';
import config from '../../../config';

class SuperAdminService {
    constructor() {
                // Log initialization of the service

        console.log('Initializing SuperAdminService');
        console.log('API URL:', `${config.apiUrl}/super-admin`);
                // Set up Axios instance with base URL and default configurations

        this.api = axios.create({
            baseURL: `${config.apiUrl}/super-admin`,
            withCredentials: true
        });
        // Request interceptor to log outgoing requests and add authorization token

        this.api.interceptors.request.use((config) => {
            console.log('Making request:', {
                method: config.method,
                url: config.url,
                data: config.data,
                headers: config.headers
            });
                        // Attach authorization token from localStorage

            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
            }
            return config;
        });

        this.api.interceptors.response.use(
            (response) => {
                console.log('Received response:', {
                    status: response.status,
                    data: response.data
                });
                return response;
            },
            (error) => {
                console.error('API Error:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                    config: error.config
                });
    // Handle unauthorized errors by clearing local storage and redirecting to login

                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async createAdmin(userData) {
        try {
            console.log('Creating admin:', {
                ...userData,
                password: '[REDACTED]'
            });

            const response = await this.api.post('/users', {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password
            });

            console.log('Create admin response:', {
                success: response.data.success,
                message: response.data.message
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            return response.data;
        } catch (error) {
            console.error('Create admin error:', error);
            throw error.response?.data?.message || error.message;
        }
    }

    async getAllUsers() {
        try {
            console.log('Fetching users');
            const response = await this.api.get('/users');

            console.log('Get users response:', {
                success: response.data.success,
                count: response.data.data?.length || 0
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            return response.data;
        } catch (error) {
            console.error('Get users error:', error);
            throw error.response?.data?.message || error.message;
        }
    }

    async updateUser(id, userData) {
        try {
            const response = await this.api.put(`/users/${id}`, userData);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update user');
            }

            return response.data;
        } catch (error) {
            console.error('Update user error:', error);
            throw error.response?.data?.message || error.message || 'Failed to update user';
        }
    }

    async deleteUser(id) {
        try {
            const response = await this.api.delete(`/users/${id}`);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete user');
            }

            return response.data;
        } catch (error) {
            console.error('Delete user error:', error);
            throw error.response?.data?.message || error.message || 'Failed to delete user';
        }
    }

    async getFinancialReport(startDate, endDate) {
        const response = await this.api.get('/financial-report', {
            params: { startDate, endDate }
        });
        return response.data;
    }

    async getDashboardStats() {
        try {
            console.log('Fetching dashboard stats...');
            const response = await this.api.get('/dashboard-stats');
            console.log('Dashboard stats response:', response.data);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch dashboard stats');
            }
            
            return response.data;
        } catch (error) {
            console.error('Dashboard stats error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch dashboard stats');
        }
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

    async getPendingContent() {
        try {
            const response = await this.api.get('/content-approvals');
            return response.data;
        } catch (error) {
            console.error('Get pending content error:', error);
            throw error.response?.data || error;
        }
    }

    async approveContent(contentId) {
        try {
            const response = await this.api.post(`/content-approvals/${contentId}/approve`);
            return response.data;
        } catch (error) {
            console.error('Approve content error:', error);
            throw error.response?.data || error;
        }
    }

    async rejectContent(contentId, notes) {
        try {
            const response = await this.api.post(`/content-approvals/${contentId}/reject`, { notes });
            return response.data;
        } catch (error) {
            console.error('Reject content error:', error);
            throw error.response?.data || error;
        }
    }

    async getAnalytics(timeRange) {
        try {
            console.log('Fetching analytics data...');
            const response = await this.api.get('/analytics', {
                params: { timeRange }
            });
            console.log('Analytics response:', response.data);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch analytics data');
            }

            return response.data;
        } catch (error) {
            console.error('Get analytics error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch analytics data');
        }
    }

    async getPayments(filters = {}) {
        try {
            const response = await this.api.get('/payments', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch payments';
        }
    }

    async getPaymentStats() {
        try {
            const response = await this.api.get('/payment-stats');
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch payment statistics';
        }
    }

    async generatePaymentReport() {
        try {
            const response = await this.api.get('/generate-payment-report', {
                responseType: 'blob'
            });
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'payment-report.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            throw error.response?.data?.message || 'Failed to generate report';
        }
    }

    async addPayment(paymentData) {
        try {
            console.log('Adding payment:', paymentData);
            const response = await this.api.post('/payments', paymentData);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to add payment');
            }
            
            console.log('Payment added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Add payment error:', error);
            throw error.response?.data?.message || error.message || 'Failed to add payment';
        }
    }
}

export default new SuperAdminService(); 