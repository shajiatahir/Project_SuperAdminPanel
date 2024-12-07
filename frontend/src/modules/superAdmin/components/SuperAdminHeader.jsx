import React from 'react';
import { useAuth } from '../../../auth/context/AuthContext';
import { FaGraduationCap, FaUserShield, FaBell } from 'react-icons/fa';

const SuperAdminHeader = () => {
    const { logout } = useAuth();

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-yellow-500 text-3xl mr-2" />
                        <span className="text-xl font-bold text-gray-800">
                            NextGen Academy
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <FaBell className="text-gray-600 text-xl" />
                        </button>
                        
                        <div className="flex items-center">
                            <FaUserShield className="text-purple-600 text-xl mr-2" />
                            <span className="text-gray-700 font-medium">Super Admin</span>
                        </div>
                        
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SuperAdminHeader; 