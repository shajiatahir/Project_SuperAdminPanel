import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    HomeIcon, 
    BookOpenIcon, 
    ChatAltIcon, 
    AcademicCapIcon 
} from '@heroicons/react/outline';

const DashboardSidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
        { name: 'Courses', path: '/dashboard/courses', icon: BookOpenIcon },
        { name: 'Forums', path: '/dashboard/forums', icon: ChatAltIcon },
        // Other navigation items...
    ];

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col h-0 flex-1 bg-gray-800">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            {/* Logo or brand name */}
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                            isActive
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                >
                                    <item.icon
                                        className="mr-3 flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar; 