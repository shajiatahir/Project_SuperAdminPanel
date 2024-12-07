import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import { DashboardProvider } from './modules/studentDashboard/context/DashboardContext';
import { SuperAdminProvider } from './modules/superAdmin/context/SuperAdminContext';

// Components
import Login from './auth/components/Login';
import Register from './auth/components/Register';
import Dashboard from './modules/studentDashboard/components/Dashboard';
import SuperAdminDashboard from './modules/superAdmin/pages/SuperAdminDashboard';
import PrivateRoute from './modules/auth/components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <DashboardProvider>
                <SuperAdminProvider>
                    <div className="App">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Super Admin Routes */}
                            <Route
                                path="/super-admin/*"
                                element={
                                    <PrivateRoute
                                        element={<SuperAdminDashboard />}
                                        allowedRoles={['superadmin']}
                                    />
                                }
                            />

                            {/* Student Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute
                                        element={<Dashboard />}
                                        allowedRoles={['student']}
                                    />
                                }
                            />

                            {/* Default Route */}
                            <Route path="/" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </div>
                </SuperAdminProvider>
            </DashboardProvider>
        </AuthProvider>
    );
}

export default App;