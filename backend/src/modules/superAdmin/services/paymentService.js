const Payment = require('../models/paymentModel');
const Subscription = require('../models/subscriptionModel');
const Promotion = require('../models/promotionModel');

class PaymentService {
    async createPayment(paymentData) {
        try {
            const payment = await Payment.create(paymentData);
            return payment;
        } catch (error) {
            throw new Error(`Error creating payment: ${error.message}`);
        }
    }

    async getPaymentsByDateRange(startDate, endDate) {
        try {
            const payments = await Payment.find({
                paymentDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('userId subscriptionId');
            return payments;
        } catch (error) {
            throw new Error(`Error fetching payments: ${error.message}`);
        }
    }

    async generateFinancialReport(startDate, endDate) {
        try {
            const payments = await Payment.find({
                paymentDate: { $gte: startDate, $lte: endDate },
                status: 'completed'
            });

            const report = {
                totalRevenue: 0,
                totalTransactions: payments.length,
                averageTransactionValue: 0,
                paymentMethods: {}
            };

            payments.forEach(payment => {
                report.totalRevenue += payment.amount;
                report.paymentMethods[payment.paymentMethod] = 
                    (report.paymentMethods[payment.paymentMethod] || 0) + 1;
            });

            report.averageTransactionValue = 
                report.totalTransactions > 0 ? 
                report.totalRevenue / report.totalTransactions : 0;

            return report;
        } catch (error) {
            throw new Error(`Error generating report: ${error.message}`);
        }
    }

    async validatePromoCode(code) {
        try {
            const promotion = await Promotion.findOne({
                code,
                isActive: true,
                validFrom: { $lte: new Date() },
                validUntil: { $gte: new Date() },
                $or: [
                    { maxUses: null },
                    { currentUses: { $lt: '$maxUses' } }
                ]
            });

            if (!promotion) {
                throw new Error('Invalid or expired promotion code');
            }

            return promotion;
        } catch (error) {
            throw new Error(`Error validating promotion: ${error.message}`);
        }
    }
}

module.exports = new PaymentService(); 