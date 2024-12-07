import { useState } from 'react';
import { createAdmin } from '../utils/api';
import { useSuperAdmin } from '../context/SuperAdminContext';

const useCreateAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { updateAdmins } = useSuperAdmin();

    const handleCreateAdmin = async (adminData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createAdmin(adminData);
            // Refresh the admin list after successful creation
            updateAdmins();
            return response;
        } catch (err) {
            const errorMessage = err.message || 'Failed to create admin';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleCreateAdmin,
        loading,
        error
    };
};

export default useCreateAdmin; 