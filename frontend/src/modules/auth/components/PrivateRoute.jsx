import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';

const PrivateRoute = ({ element: Component, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.some(role => user.roles.includes(role))) {
        // Redirect based on user's role
        if (user.roles.includes('superadmin')) {
            return <Navigate to="/super-admin" replace />;
        } else if (user.roles.includes('admin')) {
            return <Navigate to="/admin" replace />;
        } else if (user.roles.includes('student')) {
            return <Navigate to="/dashboard" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    return Component;
};

export default PrivateRoute; 