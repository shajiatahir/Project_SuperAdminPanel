import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaUsers, 
    FaMoneyBillWave, 
    FaTicketAlt, 
    FaChartLine,
    FaTags 
} from 'react-icons/fa';

const SuperAdminSidebar = () => {
    const navItems = [
        { path: '/super-admin', icon: FaChartLine, label: 'Dashboard' },
        { path: '/super-admin/admins', icon: FaUsers, label: 'Admin Management' },
        { path: '/super-admin/payments', icon: FaMoneyBillWave, label: 'Payments' },
        { path: '/super-admin/subscriptions', icon: FaTicketAlt, label: 'Subscriptions' },
        { path: '/super-admin/promotions', icon: FaTags, label: 'Promotions' }
    ];

    return (
        <aside className="w-64 min-h-screen bg-white shadow-md">
            <nav className="mt-8">
                <div className="px-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-purple-100 text-purple-600'
                                        : 'text-gray-600 hover:bg-gray-100'
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