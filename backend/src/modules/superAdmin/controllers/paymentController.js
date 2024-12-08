const ExcelJS = require('exceljs');

class PaymentController {
    // Dummy data for payments
    #payments = [
        {
            id: 'pay_1234',
            studentName: 'John Doe',
            amount: 299.99,
            status: 'completed',
            paymentMethod: 'stripe',
            courseTitle: 'Advanced React Course',
            timestamp: '2024-01-15T10:30:00Z',
            transactionId: 'txn_stripe_123456'
        },
        {
            id: 'pay_1235',
            studentName: 'Jane Smith',
            amount: 199.99,
            status: 'pending',
            paymentMethod: 'paypal',
            courseTitle: 'Node.js Masterclass',
            timestamp: '2024-01-16T14:20:00Z',
            transactionId: 'txn_paypal_789012'
        }
    ];

    async addPayment(req, res) {
        try {
            const { studentName, courseTitle, amount, status, paymentMethod, transactionId, timestamp } = req.body;

            // Create new payment record
            const newPayment = {
                id: 'pay_' + Math.random().toString(36).substr(2, 9),
                studentName,
                courseTitle,
                amount: parseFloat(amount),
                status,
                paymentMethod,
                transactionId,
                timestamp
            };

            // Add to dummy data array
            this.#payments.unshift(newPayment);

            console.log('New payment added:', newPayment);

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
            const { status, startDate, endDate } = req.query;
            let filteredPayments = [...this.#payments];

            // Apply filters if provided
            if (status) {
                filteredPayments = filteredPayments.filter(p => p.status === status);
            }

            if (startDate && endDate) {
                filteredPayments = filteredPayments.filter(p => {
                    const paymentDate = new Date(p.timestamp);
                    return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
                });
            }

            // Get summary statistics
            const summary = {
                total: filteredPayments.reduce((sum, p) => sum + p.amount, 0),
                count: filteredPayments.length,
                completed: filteredPayments.filter(p => p.status === 'completed').length,
                pending: filteredPayments.filter(p => p.status === 'pending').length
            };

            res.json({
                success: true,
                data: {
                    payments: filteredPayments,
                    summary
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
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Payment Report');

            // Add headers
            worksheet.columns = [
                { header: 'Transaction ID', key: 'transactionId', width: 20 },
                { header: 'Student Name', key: 'studentName', width: 20 },
                { header: 'Course', key: 'courseTitle', width: 30 },
                { header: 'Amount', key: 'amount', width: 15 },
                { header: 'Status', key: 'status', width: 15 },
                { header: 'Payment Method', key: 'paymentMethod', width: 15 },
                { header: 'Date', key: 'timestamp', width: 20 }
            ];

            // Style the header row
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD3D3D3' }
            };

            // Add data
            worksheet.addRows(this.#payments.map(payment => ({
                ...payment,
                amount: `$${payment.amount.toFixed(2)}`,
                timestamp: new Date(payment.timestamp).toLocaleString()
            })));

            // Set response headers
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=payment-report.xlsx'
            );

            // Write to response
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
            const stats = {
                totalRevenue: this.#payments.reduce((sum, p) => sum + p.amount, 0),
                totalTransactions: this.#payments.length,
                averageAmount: this.#payments.reduce((sum, p) => sum + p.amount, 0) / this.#payments.length,
                paymentMethods: {
                    stripe: this.#payments.filter(p => p.paymentMethod === 'stripe').length,
                    paypal: this.#payments.filter(p => p.paymentMethod === 'paypal').length
                },
                statuses: {
                    completed: this.#payments.filter(p => p.status === 'completed').length,
                    pending: this.#payments.filter(p => p.status === 'pending').length,
                    failed: this.#payments.filter(p => p.status === 'failed').length
                }
            };

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