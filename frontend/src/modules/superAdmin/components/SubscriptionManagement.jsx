import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const SubscriptionManagement = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: {
            value: '',
            unit: 'month'
        },
        features: ['']
    });

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const response = await superAdminService.getAllSubscriptions();
            setSubscriptions(response.data);
        } catch (error) {
            setError('Failed to fetch subscriptions');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({
            ...prev,
            features: newFeatures
        }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSubscription) {
                await superAdminService.updateSubscription(editingSubscription._id, formData);
                setSuccess('Subscription updated successfully');
            } else {
                await superAdminService.createSubscription(formData);
                setSuccess('Subscription created successfully');
            }
            setEditingSubscription(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                duration: {
                    value: '',
                    unit: 'month'
                },
                features: ['']
            });
            fetchSubscriptions();
        } catch (error) {
            setError(error.message || 'Failed to save subscription');
        }
    };

    const handleDeleteSubscription = async (id) => {
        if (window.confirm('Are you sure you want to delete this subscription?')) {
            try {
                await superAdminService.deleteSubscription(id);
                setSuccess('Subscription deleted successfully');
                fetchSubscriptions();
            } catch (error) {
                setError('Failed to delete subscription');
            }
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Subscription Management
            </h1>

            {/* Subscription Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    {editingSubscription ? 'Edit' : 'Create'} Subscription
                </h2>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Features</label>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                    placeholder="Enter feature"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFeature}
                            className="text-purple-600 hover:text-purple-700"
                        >
                            <FaPlus className="inline-block mr-1" /> Add Feature
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                        >
                            {editingSubscription ? 'Update' : 'Create'} Subscription
                        </button>
                    </div>
                </form>
            </div>

            {/* Subscriptions List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Current Subscriptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscriptions.map((subscription) => (
                        <div
                            key={subscription._id}
                            className="border rounded-lg p-4 hover:shadow-lg transition duration-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold">{subscription.name}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingSubscription(subscription)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSubscription(subscription._id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-purple-600 mb-2">
                                ${subscription.price}
                            </p>
                            <p className="text-gray-600 mb-4">{subscription.description}</p>
                            <ul className="space-y-2">
                                {subscription.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionManagement; 