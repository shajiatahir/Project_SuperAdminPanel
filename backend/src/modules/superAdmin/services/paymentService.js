const Payment = require('../models/paymentModel');

class PaymentService {
    async createPayment(paymentData) {
        try {
            const payment = new Payment(paymentData);
            return await payment.save();
        } catch (error) {
            console.error('Create payment error:', error);
            throw error;
        }
    }

    async getAllPayments() {
        try {
            return await Payment.find()
                .populate('userId', 'firstName lastName email')
                .populate('subscriptionId', 'name price')
                .sort({ paymentDate: -1 });
        } catch (error) {
            console.error('Get payments error:', error);
            throw error;
        }
    }

    async getPaymentById(id) {
        try {
            return await Payment.findById(id)
                .populate('userId', 'firstName lastName email')
                .populate('subscriptionId', 'name price');
        } catch (error) {
            console.error('Get payment error:', error);
            throw error;
        }
    }

    async updatePaymentStatus(id, status) {
        try {
            return await Payment.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
        } catch (error) {
            console.error('Update payment status error:', error);
            throw error;
        }
    }
}

module.exports = new PaymentService(); 