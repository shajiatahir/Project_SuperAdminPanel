import React, { useState } from 'react';
import { FaFileDownload, FaCreditCard, FaPaypal, FaPlus } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Initial dummy data
const INITIAL_PAYMENTS = [
    {
        id: 'pay_1',
        transactionId: 'txn_stripe_123456',
        studentName: 'John Doe',
        amount: 299.99,
        status: 'completed',
        paymentMethod: 'stripe',
        date: '2024-01-15T10:30:00Z'
    },
    {
        id: 'pay_2',
        transactionId: 'txn_paypal_789012',
        studentName: 'Jane Smith',
        amount: 199.99,
        status: 'pending',
        paymentMethod: 'paypal',
        date: '2024-01-16T14:20:00Z'
    },
    {
        id: 'pay_3',
        transactionId: 'txn_stripe_345678',
        studentName: 'Mike Johnson',
        amount: 149.99,
        status: 'completed',
        paymentMethod: 'stripe',
        date: '2024-01-17T09:15:00Z'
    }
];

const PaymentManagement = () => {
    const [payments, setPayments] = useState(INITIAL_PAYMENTS);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newPayment, setNewPayment] = useState({
        studentName: '',
        amount: '',
        status: 'pending',
        paymentMethod: 'stripe'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            // Create new payment with generated ID and transaction ID
            const paymentData = {
                id: 'pay_' + Math.random().toString(36).substr(2, 9),
                transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                studentName: newPayment.studentName,
                amount: parseFloat(newPayment.amount),
                status: newPayment.status,
                paymentMethod: newPayment.paymentMethod,
                date: new Date().toISOString()
            };

            // Add to payments list
            setPayments(prev => [paymentData, ...prev]);
            setSuccess('Payment added successfully');
            setShowAddForm(false);
            setNewPayment({
                studentName: '',
                amount: '',
                status: 'pending',
                paymentMethod: 'stripe'
            });
        } catch (error) {
            setError('Failed to add payment');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateReport = () => {
        try {
            // Format data for Excel
            const reportData = payments.map(payment => ({
                'Transaction ID': payment.transactionId,
                'Student Name': payment.studentName,
                'Amount': `$${payment.amount.toFixed(2)}`,
                'Status': payment.status,
                'Payment Method': payment.paymentMethod,
                'Date': new Date(payment.date).toLocaleString()
            }));

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(reportData);

            // Set column widths
            const colWidths = [
                { wch: 20 }, // Transaction ID
                { wch: 20 }, // Student Name
                { wch: 10 }, // Amount
                { wch: 12 }, // Status
                { wch: 15 }, // Payment Method
                { wch: 20 }  // Date
            ];
            ws['!cols'] = colWidths;

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Payment Report');

            // Generate Excel file
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            
            // Get current date for filename
            const date = new Date().toISOString().split('T')[0];
            saveAs(data, `payment_report_${date}.xlsx`);

            setSuccess('Report generated successfully');
        } catch (error) {
            setError('Failed to generate report');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-400/10';
            case 'pending': return 'text-yellow-400 bg-yellow-400/10';
            case 'failed': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Payment Records</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                >
                    <FaPlus className="mr-2" />
                    Add Payment
                </button>
            </div>

            {showAddForm && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Student Name</label>
                                <input
                                    type="text"
                                    value={newPayment.studentName}
                                    onChange={(e) => setNewPayment({...newPayment, studentName: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Amount ($)</label>
                                <input
                                    type="number"
                                    value={newPayment.amount}
                                    onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Payment Method</label>
                                <select
                                    value={newPayment.paymentMethod}
                                    onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                >
                                    <option value="stripe">Stripe</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Status</label>
                                <select
                                    value={newPayment.status}
                                    onChange={(e) => setNewPayment({...newPayment, status: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>

                        {error && <div className="text-red-400 text-sm">{error}</div>}
                        {success && <div className="text-green-400 text-sm">{success}</div>}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                            >
                                {loading ? 'Adding...' : 'Add Payment'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handleGenerateReport}
                        className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                    >
                        <FaFileDownload className="mr-2" />
                        Generate Report
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-white/60">Transaction ID</th>
                                <th className="text-left py-3 px-4 text-white/60">Student</th>
                                <th className="text-left py-3 px-4 text-white/60">Amount</th>
                                <th className="text-left py-3 px-4 text-white/60">Status</th>
                                <th className="text-left py-3 px-4 text-white/60">Method</th>
                                <th className="text-left py-3 px-4 text-white/60">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-b border-white/5">
                                    <td className="py-3 px-4 text-white">{payment.transactionId}</td>
                                    <td className="py-3 px-4 text-white">{payment.studentName}</td>
                                    <td className="py-3 px-4 text-white">${payment.amount.toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {payment.paymentMethod === 'stripe' ? (
                                            <FaCreditCard className="text-blue-400" />
                                        ) : (
                                            <FaPaypal className="text-blue-600" />
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-white/60">
                                        {new Date(payment.date).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentManagement; 