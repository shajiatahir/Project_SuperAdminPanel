const ExcelJS = require('exceljs');
const Payment = require('../models/paymentModel');
const paymentService = require('../services/paymentService');

class PaymentController {
    async addPayment(req, res) {
        try {
            const { studentName, courseTitle, amount, status, paymentMethod } = req.body;

            const paymentData = {
                userId: req.user._id, // Assuming you have user info in request
                subscriptionId: req.body.subscriptionId,
                amount: parseFloat(amount),
                status,
                paymentMethod,
                transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            };

            const newPayment = await paymentService.createPayment(paymentData);

            res.status(201).json({
                success: true,
                message: 'Payment record added successfully',
                data: newPayment
            });
        } catch (error) {
            console.error('Add payment error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to add payment record'
            });
        }
    }

    async getPayments(req, res) {
        try {
            console.log('Fetching payments...');
            const payments = await Payment.find()
                .populate('userId', 'firstName lastName email')
                .sort({ paymentDate: -1 });

            console.log(`Found ${payments.length} payments`);

            res.json({
                success: true,
                data: {
                    payments,
                    summary: {
                        total: payments.reduce((sum, p) => sum + p.amount, 0),
                        count: payments.length
                    }
                }
            });
        } catch (error) {
            console.error('Get payments error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch payments'
            });
        }
    }

    async generateReport(req, res) {
        try {
            const payments = await Payment.find()
                .populate('userId', 'firstName lastName email')
                .populate('subscriptionId', 'name')
                .sort({ paymentDate: -1 });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Payment Report');

            worksheet.columns = [
                { header: 'Transaction ID', key: 'transactionId', width: 20 },
                { header: 'Student Name', key: 'studentName', width: 20 },
                { header: 'Amount', key: 'amount', width: 15 },
                { header: 'Status', key: 'status', width: 15 },
                { header: 'Payment Method', key: 'paymentMethod', width: 15 },
                { header: 'Date', key: 'paymentDate', width: 20 }
            ];

            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD3D3D3' }
            };

            const rows = payments.map(payment => ({
                transactionId: payment.transactionId,
                studentName: `${payment.userId.firstName} ${payment.userId.lastName}`,
                amount: `$${payment.amount.toFixed(2)}`,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                paymentDate: new Date(payment.paymentDate).toLocaleString()
            }));

            worksheet.addRows(rows);

            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=payment-report.xlsx'
            );

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.error('Generate report error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to generate report'
            });
        }
    }

    async getPaymentStats(req, res) {
        try {
            console.log('Fetching payment stats...');
            const payments = await Payment.find();
            
            const stats = {
                totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
                totalTransactions: payments.length,
                averageAmount: payments.length > 0 ? 
                    payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0,
                paymentMethods: {
                    stripe: payments.filter(p => p.paymentMethod === 'stripe').length,
                    paypal: payments.filter(p => p.paymentMethod === 'paypal').length
                }
            };

            console.log('Payment stats:', stats);

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Get payment stats error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch payment statistics'
            });
        }
    }
}

module.exports = new PaymentController(); 