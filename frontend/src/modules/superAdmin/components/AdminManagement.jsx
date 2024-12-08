import React, { useState, useEffect } from 'react';
import { FaUserShield, FaTrash, FaEnvelope, FaKey, FaEdit } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const AdminManagement = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await superAdminService.getAllUsers();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Fetch users error:', error);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const response = await superAdminService.createAdmin(formData);

            if (response.success) {
                setSuccess('Admin created successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
                fetchUsers(); // Refresh the list
            }
        } catch (error) {
            setError(error.message || 'Failed to create admin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Create Admin Form */}
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Create Admin</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/60 mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-400 text-sm">{success}</div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Admin'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Users Table */}
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-bold text-white mb-6">User List</h2>
                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : users.length === 0 ? (
                    <div className="text-center py-4 text-white/60">No users found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-white/60">First Name</th>
                                    <th className="text-left py-3 px-4 text-white/60">Last Name</th>
                                    <th className="text-left py-3 px-4 text-white/60">Email</th>
                                    <th className="text-left py-3 px-4 text-white/60">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-white/5">
                                        <td className="py-3 px-4 text-white">{user.firstName}</td>
                                        <td className="py-3 px-4 text-white">{user.lastName}</td>
                                        <td className="py-3 px-4 text-white">{user.email}</td>
                                        <td className="py-3 px-4">
                                            {user.roles.map(role => (
                                                <span 
                                                    key={role}
                                                    className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm mr-2"
                                                >
                                                    {role}
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminManagement; 