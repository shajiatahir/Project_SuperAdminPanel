import React, { useEffect, useState } from 'react';
import { FaUsers, FaMoneyBillWave, FaTicketAlt, FaChartLine } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState({
        totalAdmins: 0,
        totalRevenue: 0,
        activeSubscriptions: 0,
        activePromotions: 0
    });

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const data = await superAdminService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchDashboardStats();
    }, []);

    const StatCard = ({ icon: Icon, title, value, bgColor }) => (
        <div className={`${bgColor} rounded-lg p-6 shadow-md`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-white text-2xl font-bold">{value}</h3>
                </div>
                <Icon className="text-white/80 text-3xl" />
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Super Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={FaUsers}
                    title="Total Admins"
                    value={stats.totalAdmins}
                    bgColor="bg-blue-600"
                />
                <StatCard
                    icon={FaMoneyBillWave}
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    bgColor="bg-green-600"
                />
                <StatCard
                    icon={FaTicketAlt}
                    title="Active Subscriptions"
                    value={stats.activeSubscriptions}
                    bgColor="bg-purple-600"
                />
                <StatCard
                    icon={FaChartLine}
                    title="Active Promotions"
                    value={stats.activePromotions}
                    bgColor="bg-orange-600"
                />
            </div>

            {/* Add more dashboard content here */}
        </div>
    );
};

export default SuperAdminDashboard; 