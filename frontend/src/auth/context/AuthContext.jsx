import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            
            if (storedUser && storedToken) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Error loading stored user:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        try {
            console.log('Login data:', userData);

            if (!userData?.success || !userData?.data) {
                throw new Error('Invalid response format');
            }

            const { token, refreshToken, user } = userData.data;

            if (!token || !refreshToken || !user) {
                throw new Error('Missing required login data');
            }

            // Store tokens and user data
            localStorage.setItem('token', `Bearer ${token}`);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));

            setUser(user);

            // Handle role-based navigation
            if (user.roles.includes('superadmin')) {
                console.log('Redirecting to super admin dashboard');
                navigate('/super-admin');
            } else if (user.roles.includes('admin')) {
                navigate('/admin');
            } else if (user.roles.includes('instructor')) {
                navigate('/instructor');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Failed to login. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        loading,
        login,
        logout,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 