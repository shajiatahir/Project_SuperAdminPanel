import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaTrash, FaEnvelope } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await superAdminService.getAllAdmins();
            setAdmins(response.data);
        } catch (error) {
            setError('Failed to fetch admins');
        }
    };

    const handleInputChange = (e) => {
        setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        try {
            await superAdminService.createAdmin(newAdmin);
            setSuccess('Admin created successfully');
            setNewAdmin({ name: '', email: '' });
            fetchAdmins();
        } catch (error) {
            setError(error.message || 'Failed to create admin');
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        try {
            await superAdminService.deleteAdmin(adminId);
            setSuccess('Admin deleted successfully');
            fetchAdmins();
        } catch (error) {
            setError('Failed to delete admin');
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Management</h1>

            {/* Create Admin Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Create New Admin</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}
                <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newAdmin.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={newAdmin.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                    >
                        <FaUserPlus className="inline-block mr-2" />
                        Create Admin
                    </button>
                </form>
            </div>

            {/* Admins List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Current Admins</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {admins.map((admin) => (
                                <tr key={admin._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {admin.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {admin.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(admin.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDeleteAdmin(admin._id)}
                                            className="text-red-600 hover:text-red-900 mr-3"
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            onClick={() => window.location.href = `mailto:${admin.email}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <FaEnvelope />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminManagement; 