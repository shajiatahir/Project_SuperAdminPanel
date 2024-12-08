import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaUsers, FaMoneyBillWave, FaTag, FaCrown, 
    FaChartLine, FaCheckCircle, FaArrowUp, FaArrowDown 
} from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const DashboardCard = ({ title, value, icon: Icon, change, onClick, color = "yellow" }) => (
    <div 
        onClick={onClick}
        className={`bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6 cursor-pointer 
            hover:bg-white/[0.04] transition-all duration-300 transform hover:scale-105`}
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-white/60 text-sm">{title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
                {change && (
                    <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {change >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                        {Math.abs(change)}% from last month
                    </div>
                )}
            </div>
            <div className={`p-3 rounded-lg bg-${color}-400/10`}>
                <Icon className={`text-${color}-400 text-xl`} />
            </div>
        </div>
    </div>
);

const SuperAdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await superAdminService.getDashboardStats();
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            setError('Failed to fetch dashboard statistics');
            console.error('Dashboard stats error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Dummy data for demonstration
    const dashboardStats = {
        admins: {
            total: 15,
            change: 20
        },
        revenue: {
            total: '$45,678',
            change: 12.5
        },
        activePromotions: {
            total: 8,
            change: -5
        },
        subscriptions: {
            total: 4,
            change: 0
        },
        pendingApprovals: {
            total: 12,
            change: 25
        },
        activeUsers: {
            total: '2,456',
            change: 15
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                <div className="text-white/60 text-sm">
                    Last updated: {new Date().toLocaleString()}
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="Total Admins"
                    value={dashboardStats.admins.total}
                    icon={FaUsers}
                    change={dashboardStats.admins.change}
                    onClick={() => navigate('/super-admin/admin-management')}
                    color="blue"
                />
                <DashboardCard
                    title="Total Revenue"
                    value={dashboardStats.revenue.total}
                    icon={FaMoneyBillWave}
                    change={dashboardStats.revenue.change}
                    onClick={() => navigate('/super-admin/payments')}
                    color="green"
                />
                <DashboardCard
                    title="Active Promotions"
                    value={dashboardStats.activePromotions.total}
                    icon={FaTag}
                    change={dashboardStats.activePromotions.change}
                    onClick={() => navigate('/super-admin/promotions')}
                    color="purple"
                />
                <DashboardCard
                    title="Subscription Plans"
                    value={dashboardStats.subscriptions.total}
                    icon={FaCrown}
                    change={dashboardStats.subscriptions.change}
                    onClick={() => navigate('/super-admin/subscriptions')}
                    color="yellow"
                />
                <DashboardCard
                    title="Pending Approvals"
                    value={dashboardStats.pendingApprovals.total}
                    icon={FaCheckCircle}
                    change={dashboardStats.pendingApprovals.change}
                    onClick={() => navigate('/super-admin/content-approvals')}
                    color="red"
                />
                <DashboardCard
                    title="Active Users"
                    value={dashboardStats.activeUsers.total}
                    icon={FaChartLine}
                    change={dashboardStats.activeUsers.change}
                    onClick={() => navigate('/super-admin/analytics')}
                    color="indigo"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-400/10 rounded-lg">
                                        <FaMoneyBillWave className="text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Course Purchase</p>
                                        <p className="text-white/60 text-sm">John Doe</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-medium">$99.99</p>
                                    <p className="text-white/60 text-sm">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Content Approvals */}
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Pending Approvals</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-400/10 rounded-lg">
                                        <FaCheckCircle className="text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">New Course Submission</p>
                                        <p className="text-white/60 text-sm">Advanced React Patterns</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20">
                                    Review
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard; 