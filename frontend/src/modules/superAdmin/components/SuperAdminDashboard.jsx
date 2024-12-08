import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaUsers, 
    FaMoneyBillWave, 
    FaTag, 
    FaCrown, 
    FaChartLine, 
    FaCheckCircle,
    FaUserShield
} from 'react-icons/fa';

const DashboardCard = ({ title, value, icon: Icon, change, onClick, color = "yellow", description }) => (
    <div 
        onClick={onClick}
        className={`bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6 cursor-pointer 
            hover:bg-white/[0.04] transition-all duration-300 transform hover:scale-105`}
    >
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-white/60 text-sm">{title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-${color}-400/10`}>
                <Icon className={`text-${color}-400 text-xl`} />
            </div>
        </div>
        <p className="text-white/60 text-sm">{description}</p>
    </div>
);

const SuperAdminDashboard = () => {
    const navigate = useNavigate();

    const dashboardModules = [
        {
            title: "Admin Management",
            value: "6 Admins",
            icon: FaUserShield,
            color: "blue",
            path: "/super-admin/admins",
            description: "Manage admin accounts and permissions"
        },
        {
            title: "Payment Management",
            value: "$45,678",
            icon: FaMoneyBillWave,
            color: "green",
            path: "/super-admin/payments",
            description: "View and manage payment transactions"
        },
        {
            title: "Promotions",
            value: "8 Active",
            icon: FaTag,
            color: "purple",
            path: "/super-admin/promotions",
            description: "Manage promotional offers and discounts"
        },
        {
            title: "Subscriptions",
            value: "4 Plans",
            icon: FaCrown,
            color: "yellow",
            path: "/super-admin/subscriptions",
            description: "Configure subscription packages"
        },
        {
            title: "Content Approvals",
            value: "12 Pending",
            icon: FaCheckCircle,
            color: "red",
            path: "/super-admin/content-approvals",
            description: "Review and approve content submissions"
        },
        {
            title: "Analytics",
            value: "2.4k Users",
            icon: FaChartLine,
            color: "indigo",
            path: "/super-admin/analytics",
            description: "View platform statistics and insights"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Super Admin Dashboard</h1>
                <p className="text-white/60">
                    Welcome back, Super Admin
                </p>
            </div>

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardModules.map((module, index) => (
                    <DashboardCard
                        key={index}
                        title={module.title}
                        value={module.value}
                        icon={module.icon}
                        color={module.color}
                        description={module.description}
                        onClick={() => navigate(module.path)}
                    />
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
                        <button 
                            onClick={() => navigate('/super-admin/payments')}
                            className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                            View All
                        </button>
                    </div>
                    {/* Add transaction list here */}
                </div>

                {/* Pending Approvals */}
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">Pending Approvals</h2>
                        <button 
                            onClick={() => navigate('/super-admin/content-approvals')}
                            className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                            View All
                        </button>
                    </div>
                    {/* Add approvals list here */}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard; 