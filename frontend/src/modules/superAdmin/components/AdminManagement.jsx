import React, { useState } from 'react';
import { FaUserShield, FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaBook, FaUsers, FaClock, FaChartBar } from 'react-icons/fa';

// Initial dummy data with detailed information
const INITIAL_ADMINS = [
    {
        id: 'admin_1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@admin.com',
        roles: ['superadmin'],
        joinDate: '2023-01-15',
        lastActive: '2024-01-20T10:30:00Z',
        stats: {
            coursesUploaded: 15,
            studentsManaged: 150,
            activeHours: 120,
            lastWeekActivity: 22
        },
        recentActivities: [
            { action: 'Uploaded Course', item: 'Advanced React Patterns', timestamp: '2024-01-19T15:30:00Z' },
            { action: 'Approved Content', item: 'Node.js Basics', timestamp: '2024-01-18T11:20:00Z' },
            { action: 'Modified Course', item: 'Python for Beginners', timestamp: '2024-01-17T09:45:00Z' }
        ]
    },
    {
        id: 'admin_2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@admin.com',
        roles: ['superadmin'],
        joinDate: '2023-03-20',
        lastActive: '2024-01-19T16:45:00Z',
        stats: {
            coursesUploaded: 12,
            studentsManaged: 180,
            activeHours: 95,
            lastWeekActivity: 18
        },
        recentActivities: [
            { action: 'Updated Content', item: 'Web Development Bootcamp', timestamp: '2024-01-19T14:20:00Z' },
            { action: 'Reviewed Course', item: 'JavaScript Fundamentals', timestamp: '2024-01-18T13:15:00Z' }
        ]
    },
    {
        id: 'admin_3',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.j@admin.com',
        roles: ['superadmin'],
        joinDate: '2023-06-10',
        lastActive: '2024-01-20T08:15:00Z',
        stats: {
            coursesUploaded: 8,
            studentsManaged: 220,
            activeHours: 85,
            lastWeekActivity: 15
        },
        recentActivities: [
            { action: 'Created Course', item: 'Database Design Fundamentals', timestamp: '2024-01-20T08:15:00Z' },
            { action: 'Updated Content', item: 'SQL Masterclass', timestamp: '2024-01-19T16:30:00Z' },
            { action: 'Reviewed Course', item: 'MongoDB Essentials', timestamp: '2024-01-18T14:45:00Z' }
        ]
    },
    {
        id: 'admin_4',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.w@admin.com',
        roles: ['superadmin'],
        joinDate: '2023-09-05',
        lastActive: '2024-01-19T17:30:00Z',
        stats: {
            coursesUploaded: 20,
            studentsManaged: 175,
            activeHours: 110,
            lastWeekActivity: 25
        },
        recentActivities: [
            { action: 'Modified Course', item: 'UI/UX Design Principles', timestamp: '2024-01-19T17:30:00Z' },
            { action: 'Added Content', item: 'Figma Masterclass', timestamp: '2024-01-18T15:20:00Z' },
            { action: 'Reviewed Course', item: 'Design Systems', timestamp: '2024-01-17T11:45:00Z' }
        ]
    },
    {
        id: 'admin_5',
        firstName: 'David',
        lastName: 'Chen',
        email: 'david.c@admin.com',
        roles: ['superadmin'],
        joinDate: '2023-11-15',
        lastActive: '2024-01-20T09:45:00Z',
        stats: {
            coursesUploaded: 6,
            studentsManaged: 90,
            activeHours: 45,
            lastWeekActivity: 12
        },
        recentActivities: [
            { action: 'Added Course', item: 'Machine Learning Basics', timestamp: '2024-01-20T09:45:00Z' },
            { action: 'Updated Content', item: 'Python for Data Science', timestamp: '2024-01-19T13:15:00Z' },
            { action: 'Created Course', item: 'AI Fundamentals', timestamp: '2024-01-18T10:30:00Z' }
        ]
    },
    {
        id: 'admin_6',
        firstName: 'Emily',
        lastName: 'Taylor',
        email: 'emily.t@admin.com',
        roles: ['superadmin'],
        joinDate: '2023-12-01',
        lastActive: '2024-01-20T11:20:00Z',
        stats: {
            coursesUploaded: 4,
            studentsManaged: 65,
            activeHours: 30,
            lastWeekActivity: 10
        },
        recentActivities: [
            { action: 'Created Course', item: 'Digital Marketing 101', timestamp: '2024-01-20T11:20:00Z' },
            { action: 'Added Content', item: 'Social Media Strategy', timestamp: '2024-01-19T14:45:00Z' },
            { action: 'Reviewed Course', item: 'SEO Fundamentals', timestamp: '2024-01-18T16:30:00Z' }
        ]
    }
];

const AdminManagement = () => {
    const [admins, setAdmins] = useState(INITIAL_ADMINS);
    const [expandedAdmin, setExpandedAdmin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [editFormData, setEditFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        roles: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            setSuccess('');

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newAdmin = {
                id: 'admin_' + Math.random().toString(36).substr(2, 9),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                roles: ['superadmin'],
                joinDate: new Date().toISOString().split('T')[0],
                lastActive: new Date().toISOString(),
                stats: {
                    coursesUploaded: 0,
                    studentsManaged: 0,
                    activeHours: 0,
                    lastWeekActivity: 0
                },
                recentActivities: []
            };

            setAdmins(prev => [...prev, newAdmin]);
            setSuccess('Super Admin created successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
            setShowAddForm(false);
        } catch (error) {
            setError('Failed to create admin');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            setAdmins(prev => prev.filter(admin => admin.id !== adminId));
            setSuccess('Admin deleted successfully');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const handleEditClick = (admin) => {
        setEditingAdmin(admin.id);
        setEditFormData({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            roles: admin.roles
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setAdmins(prev => prev.map(admin => 
                admin.id === editingAdmin ? {
                    ...admin,
                    ...editFormData,
                    lastActive: new Date().toISOString()
                } : admin
            ));

            setSuccess('Admin updated successfully');
            setEditingAdmin(null);
        } catch (error) {
            setError('Failed to update admin');
        } finally {
            setLoading(false);
        }
    };

    const handleEditCancel = () => {
        setEditingAdmin(null);
        setEditFormData({
            firstName: '',
            lastName: '',
            email: '',
            roles: []
        });
    };

    return (
        <div className="space-y-6">
            {/* Create Admin Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Admin Management</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                >
                    <FaUserShield className="mr-2" />
                    Add New Admin
                </button>
            </div>

            {/* Create Admin Form */}
            {showAddForm && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
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
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                                {success}
                            </div>
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
            )}

            {/* Admins List */}
            <div className="space-y-4">
                {admins.map((admin) => (
                    <div 
                        key={admin.id}
                        className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
                    >
                        {editingAdmin === admin.id ? (
                            // Edit Form
                            <div className="p-6">
                                <form onSubmit={handleEditSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white/60 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={editFormData.firstName}
                                                onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/60 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value={editFormData.lastName}
                                                onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/60 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={editFormData.email}
                                                onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={handleEditCancel}
                                            className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            // Normal View
                            <>
                                {/* Admin Header */}
                                <div 
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5"
                                    onClick={() => setExpandedAdmin(expandedAdmin === admin.id ? null : admin.id)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                                            <FaUserShield className="text-yellow-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {admin.firstName} {admin.lastName}
                                            </h3>
                                            <p className="text-white/60">{admin.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(admin);
                                                }}
                                                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(admin.id);
                                                }}
                                                className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                        {expandedAdmin === admin.id ? <FaChevronUp className="text-white/60" /> : <FaChevronDown className="text-white/60" />}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedAdmin === admin.id && (
                                    <div className="p-4 border-t border-white/10 space-y-4">
                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="flex items-center text-yellow-400 mb-2">
                                                    <FaBook className="mr-2" />
                                                    <h4>Courses Uploaded</h4>
                                                </div>
                                                <p className="text-2xl font-bold text-white">{admin.stats.coursesUploaded}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="flex items-center text-blue-400 mb-2">
                                                    <FaUsers className="mr-2" />
                                                    <h4>Students Managed</h4>
                                                </div>
                                                <p className="text-2xl font-bold text-white">{admin.stats.studentsManaged}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="flex items-center text-green-400 mb-2">
                                                    <FaClock className="mr-2" />
                                                    <h4>Active Hours</h4>
                                                </div>
                                                <p className="text-2xl font-bold text-white">{admin.stats.activeHours}h</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="flex items-center text-purple-400 mb-2">
                                                    <FaChartBar className="mr-2" />
                                                    <h4>Last Week Activity</h4>
                                                </div>
                                                <p className="text-2xl font-bold text-white">{admin.stats.lastWeekActivity}h</p>
                                            </div>
                                        </div>

                                        {/* Recent Activities */}
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <h4 className="text-lg font-semibold text-white mb-4">Recent Activities</h4>
                                            <div className="space-y-3">
                                                {admin.recentActivities.map((activity, index) => (
                                                    <div key={index} className="flex justify-between items-center">
                                                        <div>
                                                            <p className="text-white">{activity.action}</p>
                                                            <p className="text-white/60 text-sm">{activity.item}</p>
                                                        </div>
                                                        <p className="text-white/60 text-sm">{formatDate(activity.timestamp)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-white/60">Join Date</p>
                                                <p className="text-white">{admin.joinDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-white/60">Last Active</p>
                                                <p className="text-white">{formatDate(admin.lastActive)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminManagement; 