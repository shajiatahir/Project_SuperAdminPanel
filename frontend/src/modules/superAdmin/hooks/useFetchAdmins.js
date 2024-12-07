import { useState, useEffect } from 'react';
import { getAdmins } from '../utils/api';

const useFetchAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const data = await getAdmins();
            setAdmins(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return { admins, loading, error, refetchAdmins: fetchAdmins };
};

export default useFetchAdmins; 