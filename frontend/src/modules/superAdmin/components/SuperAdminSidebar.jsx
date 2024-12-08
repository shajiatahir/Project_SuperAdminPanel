import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaUsers, 
    FaMoneyBillWave, 
    FaTicketAlt, 
    FaChartLine,
    FaTags,
    FaChartBar,
    FaClipboardCheck 
} from 'react-icons/fa';

const SuperAdminSidebar = () => {
    const navItems = [
        { path: '/super-admin', icon: FaChartLine, label: 'Dashboard' },
        { path: '/super-admin/analytics', icon: FaChartBar, label: 'Analytics' },
        { path: '/super-admin/content-approvals', icon: FaClipboardCheck, label: 'Content Approvals' },
        { path: '/super-admin/admins', icon: FaUsers, label: 'Admin Management' },
        { path: '/super-admin/payments', icon: FaMoneyBillWave, label: 'Payments' },
        { path: '/super-admin/subscriptions', icon: FaTicketAlt, label: 'Subscriptions' },
        { path: '/super-admin/promotions', icon: FaTags, label: 'Promotions' }
    ];

    return (
        <aside className="w-64 min-h-screen bg-white/[0.02] backdrop-blur-xl border-r border-white/10">
            <nav className="mt-8">
                <div className="px-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-yellow-400/10 text-yellow-400'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="text-xl mr-3" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default SuperAdminSidebar; 