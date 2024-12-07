import React from 'react';
import CreateAdminForm from '../components/CreateAdminForm';
import AdminList from '../components/AdminList';

const SuperAdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Super Admin Dashboard
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Create Admin Form */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <CreateAdminForm />
                        </div>

                        {/* Admin List */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <AdminList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard; 