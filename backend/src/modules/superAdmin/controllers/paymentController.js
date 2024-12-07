const PaymentService = require('../services/paymentService');
const { validateDateRange } = require('../utils/validationUtils');

class PaymentController {
    async getFinancialReport(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const { error } = validateDateRange({ startDate, endDate });
            
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message
                });
            }

            const report = await PaymentService.generateFinancialReport(
                new Date(startDate),
                new Date(endDate)
            );

            res.status(200).json({
                success: true,
                data: report
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createPromotion(req, res) {
        try {
            const promotion = await PaymentService.createPromotion(req.body);
            res.status(201).json({
                success: true,
                data: promotion
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getPaymentsByDate(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const payments = await PaymentService.getPaymentsByDateRange(
                new Date(startDate),
                new Date(endDate)
            );

            res.status(200).json({
                success: true,
                data: payments
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new PaymentController(); 