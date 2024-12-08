import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminHeader from './SuperAdminHeader';

const SuperAdminLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <SuperAdminHeader />
            <div className="flex">
                <SuperAdminSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout; 