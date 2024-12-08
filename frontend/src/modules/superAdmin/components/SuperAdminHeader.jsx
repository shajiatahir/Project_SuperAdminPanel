import React from 'react';
import { useAuth } from '../../../auth/context/AuthContext';
import { FaGraduationCap, FaUserShield, FaBell } from 'react-icons/fa';

const SuperAdminHeader = () => {
    const { logout } = useAuth();

    return (
        <header className="bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-yellow-400 text-3xl mr-2" />
                        <span className="text-xl font-bold text-white">
                            NextGen Academy
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                            <FaBell className="text-white/60 text-xl" />
                        </button>
                        
                        <div className="flex items-center">
                            <FaUserShield className="text-yellow-400 text-xl mr-2" />
                            <span className="text-white/90 font-medium">Super Admin</span>
                        </div>
                        
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500/10 text-red-300 rounded-lg hover:bg-red-500/20 transition-colors"
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