import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCrown, FaCheck, FaTimes } from 'react-icons/fa';

const INITIAL_SUBSCRIPTIONS = [
    {
        id: 'sub_1',
        name: 'Basic Plan',
        price: 29.99,
        duration: 'monthly',
        features: [
            'Access to basic courses',
            'Email support',
            'HD video quality',
            'Certificate of completion'
        ],
        color: 'blue',
        isPopular: false,
        active: true
    },
    {
        id: 'sub_2',
        name: 'Pro Plan',
        price: 49.99,
        duration: 'monthly',
        features: [
            'Access to all courses',
            'Priority support',
            '4K video quality',
            'Certificate of completion',
            'Downloadable resources',
            'Group sessions'
        ],
        color: 'yellow',
        isPopular: true,
        active: true
    },
    {
        id: 'sub_3',
        name: 'Enterprise Plan',
        price: 99.99,
        duration: 'monthly',
        features: [
            'Everything in Pro Plan',
            '24/7 dedicated support',
            'Custom learning paths',
            'Team management',
            'API access',
            'Custom branding'
        ],
        color: 'purple',
        isPopular: false,
        active: true
    }
];

const SubscriptionManagement = () => {
    const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        duration: 'monthly',
        features: [''],
        color: 'blue',
        isPopular: false,
        active: true
    });

    const handleAddFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...formData.features];
        updatedFeatures[index] = value;
        setFormData(prev => ({
            ...prev,
            features: updatedFeatures
        }));
    };

    const handleRemoveFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            const newSubscription = {
                id: editingSubscription?.id || `sub_${Math.random().toString(36).substr(2, 9)}`,
                ...formData
            };

            if (editingSubscription) {
                // Update existing subscription
                setSubscriptions(prev => prev.map(sub => 
                    sub.id === editingSubscription.id ? newSubscription : sub
                ));
                setSuccess('Subscription updated successfully');
                setEditingSubscription(null);
            } else {
                // Add new subscription
                setSubscriptions(prev => [...prev, newSubscription]);
                setSuccess('Subscription added successfully');
                setShowAddForm(false);
            }

            // Reset form
            setFormData({
                name: '',
                price: '',
                duration: 'monthly',
                features: [''],
                color: 'blue',
                isPopular: false,
                active: true
            });
        } catch (error) {
            setError('Failed to save subscription');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (subscription) => {
        setEditingSubscription(subscription);
        setFormData({
            name: subscription.name,
            price: subscription.price,
            duration: subscription.duration,
            features: [...subscription.features],
            color: subscription.color,
            isPopular: subscription.isPopular,
            active: subscription.active
        });
        setShowAddForm(true);
    };

    const handleDelete = (subscriptionId) => {
        if (window.confirm('Are you sure you want to delete this subscription?')) {
            setSubscriptions(prev => prev.filter(sub => sub.id !== subscriptionId));
            setSuccess('Subscription deleted successfully');
        }
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setEditingSubscription(null);
        setFormData({
            name: '',
            price: '',
            duration: 'monthly',
            features: [''],
            color: 'blue',
            isPopular: false,
            active: true
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Subscription Packages</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                >
                    <FaPlus className="mr-2" />
                    Add Package
                </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        {editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Package Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Price</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-white/60 text-sm mb-1">Features</label>
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                        placeholder="Enter feature"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFeature(index)}
                                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddFeature}
                                className="text-blue-400 text-sm hover:text-blue-300"
                            >
                                + Add Feature
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-white/60">
                                <input
                                    type="checkbox"
                                    checked={formData.isPopular}
                                    onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                                    className="form-checkbox bg-white/5 border border-white/10 rounded text-yellow-400"
                                />
                                Mark as Popular
                            </label>
                        </div>

                        {error && <div className="text-red-400 text-sm">{error}</div>}
                        {success && <div className="text-green-400 text-sm">{success}</div>}

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                            >
                                {loading ? 'Saving...' : editingSubscription ? 'Update Package' : 'Add Package'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Subscription Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriptions.map((subscription) => (
                    <div
                        key={subscription.id}
                        className={`relative bg-white/[0.02] backdrop-blur-xl rounded-xl border border-${subscription.color}-400/20 p-6 ${
                            subscription.isPopular ? 'ring-2 ring-yellow-400' : ''
                        }`}
                    >
                        {subscription.isPopular && (
                            <div className="absolute -top-3 -right-3">
                                <FaCrown className="text-yellow-400 text-2xl" />
                            </div>
                        )}
                        
                        <h3 className="text-xl font-bold text-white mb-2">{subscription.name}</h3>
                        <div className="flex items-baseline mb-4">
                            <span className="text-3xl font-bold text-white">${subscription.price}</span>
                            <span className="text-white/60 ml-2">/{subscription.duration}</span>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {subscription.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-white/80">
                                    <FaCheck className={`text-${subscription.color}-400 mr-2`} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => handleEdit(subscription)}
                                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(subscription.id)}
                                className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionManagement; 