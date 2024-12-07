import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminHeader from './SuperAdminHeader';

const SuperAdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <SuperAdminHeader />
            <div className="flex">
                <SuperAdminSidebar />
                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout; 