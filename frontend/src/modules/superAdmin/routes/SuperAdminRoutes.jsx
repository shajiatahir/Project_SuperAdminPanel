import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminDashboard from '../components/SuperAdminDashboard';
import AdminManagement from '../components/AdminManagement';
import PaymentManagement from '../components/PaymentManagement';
import SubscriptionManagement from '../components/SubscriptionManagement';
import PromotionManagement from '../components/PromotionManagement';
import SuperAdminLayout from '../components/SuperAdminLayout';

const SuperAdminRoutes = () => {
    return (
        <Routes>
            <Route element={<SuperAdminLayout />}>
                <Route index element={<SuperAdminDashboard />} />
                <Route path="admins" element={<AdminManagement />} />
                <Route path="payments" element={<PaymentManagement />} />
                <Route path="subscriptions" element={<SubscriptionManagement />} />
                <Route path="promotions" element={<PromotionManagement />} />
                <Route path="*" element={<Navigate to="/super-admin" replace />} />
            </Route>
        </Routes>
    );
};

export default SuperAdminRoutes; 