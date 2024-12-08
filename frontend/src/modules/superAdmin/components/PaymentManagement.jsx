import React, { useState, useEffect } from 'react';
import { FaFileDownload, FaFilter, FaChartBar, FaCreditCard, FaPaypal, FaPlus } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const INITIAL_DUMMY_DATA = [
    {
        id: 'pay_1234',
        studentName: 'John Doe',
        courseTitle: 'Advanced React Course',
        amount: 299.99,
        status: 'completed',
        paymentMethod: 'stripe',
        timestamp: '2024-01-15T10:30:00Z',
        transactionId: 'txn_stripe_123456'
    },
    {
        id: 'pay_1235',
        studentName: 'Jane Smith',
        courseTitle: 'Node.js Masterclass',
        amount: 199.99,
        status: 'pending',
        paymentMethod: 'paypal',
        timestamp: '2024-01-16T14:20:00Z',
        transactionId: 'txn_paypal_789012'
    },
    {
        id: 'pay_1236',
        studentName: 'Mike Johnson',
        courseTitle: 'Python for Beginners',
        amount: 149.99,
        status: 'completed',
        paymentMethod: 'stripe',
        timestamp: '2024-01-17T09:15:00Z',
        transactionId: 'txn_stripe_345678'
    }
];

const PaymentManagement = () => {
    const [payments, setPayments] = useState(INITIAL_DUMMY_DATA);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPayment, setNewPayment] = useState({
        studentName: '',
        courseTitle: '',
        amount: '',
        status: 'pending',
        paymentMethod: 'stripe'
    });

    const [filters, setFilters] = useState({
        status: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchPayments();
        fetchStats();
    }, [filters]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await superAdminService.getPayments(filters);
            if (response.success) {
                setPayments(response.data.payments);
            }
        } catch (error) {
            setError('Failed to fetch payments');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await superAdminService.getPaymentStats();
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch payment stats:', error);
        }
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            setSuccess('');

            // Generate a random transaction ID
            const transactionId = 'txn_' + Math.random().toString(36).substr(2, 9);
            const timestamp = new Date().toISOString();

            const paymentData = {
                id: 'pay_' + Math.random().toString(36).substr(2, 9),
                studentName: newPayment.studentName,
                courseTitle: newPayment.courseTitle,
                amount: parseFloat(newPayment.amount),
                status: newPayment.status,
                paymentMethod: newPayment.paymentMethod,
                transactionId,
                timestamp
            };

            // Add new payment to the list immediately
            setPayments(prevPayments => [paymentData, ...prevPayments]);
            
            setSuccess('Payment record added successfully');
            setShowAddForm(false);
            setNewPayment({
                studentName: '',
                courseTitle: '',
                amount: '',
                status: 'pending',
                paymentMethod: 'stripe'
            });

        } catch (error) {
            console.error('Add payment error:', error);
            setError(error.message || 'Failed to add payment record');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateReport = async () => {
        try {
            setLoading(true);
            setError('');

            // Format the data for Excel
            const reportData = payments.map(payment => ({
                'Transaction ID': payment.transactionId,
                'Student Name': payment.studentName,
                'Course': payment.courseTitle,
                'Amount': `$${payment.amount.toFixed(2)}`,
                'Status': payment.status,
                'Payment Method': payment.paymentMethod,
                'Date': new Date(payment.timestamp).toLocaleString()
            }));

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(reportData);

            // Set column widths
            const colWidths = [
                { wch: 20 }, // Transaction ID
                { wch: 20 }, // Student Name
                { wch: 30 }, // Course
                { wch: 10 }, // Amount
                { wch: 12 }, // Status
                { wch: 15 }, // Payment Method
                { wch: 20 }  // Date
            ];
            ws['!cols'] = colWidths;

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Payment Report');

            // Generate Excel file
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            
            // Get current date for filename
            const date = new Date().toISOString().split('T')[0];
            saveAs(data, `payment_report_${date}.xlsx`);

            setSuccess('Report generated successfully');
        } catch (error) {
            console.error('Generate report error:', error);
            setError('Failed to generate report');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-500/10 text-green-400';
            case 'pending': return 'bg-yellow-500/10 text-yellow-400';
            case 'failed': return 'bg-red-500/10 text-red-400';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-4">
                        <h3 className="text-white/60 text-sm">Total Revenue</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            ${stats.totalRevenue.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-4">
                        <h3 className="text-white/60 text-sm">Total Transactions</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {stats.totalTransactions}
                        </p>
                    </div>
                    {/* Add more stat cards as needed */}
                </div>
            )}

            {/* Add Payment Form */}
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Payment Records</h2>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                    >
                        <FaPlus className="mr-2" />
                        Add Payment Record
                    </button>
                </div>

                {showAddForm && (
                    <form onSubmit={handleAddPayment} className="grid grid-cols-2 gap-4 mb-6">
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
                            <label className="block text-white/60 text-sm mb-1">Course Title</label>
                            <input
                                type="text"
                                value={newPayment.courseTitle}
                                onChange={(e) => setNewPayment({...newPayment, courseTitle: e.target.value})}
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
                        <div className="col-span-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                            >
                                {loading ? 'Adding...' : 'Add Payment'}
                            </button>
                        </div>
                    </form>
                )}

                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                        {success}
                    </div>
                )}

                {/* Filters and Generate Report */}
                <div className="flex flex-wrap gap-4 mb-4">
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    >
                        <option value="">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>

                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />

                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />

                    <button
                        onClick={handleGenerateReport}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20 disabled:opacity-50"
                    >
                        <FaFileDownload className="mr-2" />
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                </div>

                {/* Payments Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-white/60">Transaction ID</th>
                                <th className="text-left py-3 px-4 text-white/60">Student</th>
                                <th className="text-left py-3 px-4 text-white/60">Course</th>
                                <th className="text-left py-3 px-4 text-white/60">Amount</th>
                                <th className="text-left py-3 px-4 text-white/60">Status</th>
                                <th className="text-left py-3 px-4 text-white/60">Method</th>
                                <th className="text-left py-3 px-4 text-white/60">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-white/60">
                                        No payment records found
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="border-b border-white/5">
                                        <td className="py-3 px-4 text-white">{payment.transactionId}</td>
                                        <td className="py-3 px-4 text-white">{payment.studentName}</td>
                                        <td className="py-3 px-4 text-white">{payment.courseTitle}</td>
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
                                            {new Date(payment.timestamp).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentManagement; 