import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SuperAdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || !user.roles.includes('superadmin')) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default SuperAdminRoute; 