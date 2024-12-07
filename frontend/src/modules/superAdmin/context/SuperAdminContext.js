import React, { createContext, useContext, useState, useCallback } from 'react';

const SuperAdminContext = createContext();

export const SuperAdminProvider = ({ children }) => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAdmins = useCallback((newAdmins) => {
        setAdmins(newAdmins);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const value = {
        admins,
        loading,
        error,
        updateAdmins,
        setLoading,
        setError,
        clearError
    };

    return (
        <SuperAdminContext.Provider value={value}>
            {children}
        </SuperAdminContext.Provider>
    );
};

export const useSuperAdmin = () => {
    const context = useContext(SuperAdminContext);
    if (!context) {
        throw new Error('useSuperAdmin must be used within a SuperAdminProvider');
    }
    return context;
};

export default SuperAdminContext; 