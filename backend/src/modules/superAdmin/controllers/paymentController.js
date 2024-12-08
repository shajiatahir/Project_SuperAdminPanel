const ExcelJS = require('exceljs');
const Payment = require('../models/paymentModel');
const paymentService = require('../services/paymentService');

class PaymentController {
    // Add a new payment record to the database
    async addPayment(req, res) {
        try {
            // Extracting payment details from the request body
            const { studentName, courseTitle, amount, status, paymentMethod } = req.body;

            // Creating a new payment data object
            const paymentData = {
                userId: req.user._id, // Assuming `req.user` contains authenticated user info
                subscriptionId: req.body.subscriptionId, // Optional field for subscription association
                amount: parseFloat(amount), // Convert amount to a number
                status, // Payment status (e.g., pending, completed)
                paymentMethod, // Payment method (e.g., stripe, paypal)
                transactionId: 'txn_' + Math.random().toString(36).substr(2, 9), // Generate a random transaction ID
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Set validity for 30 days
            };

            // Save the payment record using the service layer
            const newPayment = await paymentService.createPayment(paymentData);

            // Respond with the created payment record
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

    // Retrieve all payments from the database
    async getPayments(req, res) {
        try {
            console.log('Fetching payments...');
            
            // Fetch payments, including user and subscription details
            const payments = await Payment.find()
                .populate('userId', 'firstName lastName email') // Fetch user details
                .sort({ paymentDate: -1 }); // Sort by payment date (latest first)

            console.log(`Found ${payments.length} payments`);

            // Respond with payments and summary stats
            res.json({
                success: true,
                data: {
                    payments,
                    summary: {
                        total: payments.reduce((sum, p) => sum + p.amount, 0), // Total revenue
                        count: payments.length // Total number of payments
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

    // Generate an Excel report of all payments
    async generateReport(req, res) {
        try {
            // Fetch payments with user and subscription details
            const payments = await Payment.find()
                .populate('userId', 'firstName lastName email')
                .populate('subscriptionId', 'name')
                .sort({ paymentDate: -1 });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Payment Report');

            // Define worksheet columns
            worksheet.columns = [
                { header: 'Transaction ID', key: 'transactionId', width: 20 },
                { header: 'Student Name', key: 'studentName', width: 20 },
                { header: 'Amount', key: 'amount', width: 15 },
                { header: 'Status', key: 'status', width: 15 },
                { header: 'Payment Method', key: 'paymentMethod', width: 15 },
                { header: 'Date', key: 'paymentDate', width: 20 }
            ];

            // Style the header row
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD3D3D3' } // Light gray background
            };

            // Map payment data to worksheet rows
            const rows = payments.map(payment => ({
                transactionId: payment.transactionId,
                studentName: `${payment.userId.firstName} ${payment.userId.lastName}`, // Concatenate user names
                amount: `$${payment.amount.toFixed(2)}`, // Format amount
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                paymentDate: new Date(payment.paymentDate).toLocaleString() // Format date
            }));

            worksheet.addRows(rows);

            // Set response headers for file download
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=payment-report.xlsx'
            );

            // Write workbook to the response stream
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

    // Fetch payment statistics
    async getPaymentStats(req, res) {
        try {
            console.log('Fetching payment stats...');

            // Retrieve all payments
            const payments = await Payment.find();
            
            // Calculate summary statistics
            const stats = {
                totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0), // Total revenue
                totalTransactions: payments.length, // Total transactions
                averageAmount: payments.length > 0 ? 
                    payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0, // Average amount
                paymentMethods: {
                    stripe: payments.filter(p => p.paymentMethod === 'stripe').length, // Stripe payment count
                    paypal: payments.filter(p => p.paymentMethod === 'paypal').length // PayPal payment count
                }
            };

            console.log('Payment stats:', stats);

            // Respond with statistics
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
