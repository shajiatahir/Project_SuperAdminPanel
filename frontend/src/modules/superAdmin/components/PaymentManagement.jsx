import React, { useState, useEffect } from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await superAdminService.getPaymentsByDate(
                dateRange.startDate,
                dateRange.endDate
            );
            setPayments(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch payments');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e) => {
        setDateRange({
            ...dateRange,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPayments();
    };

    const downloadReport = () => {
        // Implement report download functionality
        console.log('Downloading report...');
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
                <button
                    onClick={downloadReport}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                >
                    <FaDownload className="inline-block mr-2" />
                    Export Report
                </button>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 mb-2">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={dateRange.startDate}
                            onChange={handleDateChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 mb-2">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={dateRange.endDate}
                            onChange={handleDateChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                        >
                            <FaSearch className="inline-block mr-2" />
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {payment.transactionId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {payment.userId.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        ${payment.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                payment.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : payment.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
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