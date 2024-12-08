import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCrown, FaCheck } from 'react-icons/fa';

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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [newSubscription, setNewSubscription] = useState({
        name: '',
        price: '',
        duration: 'monthly',
        features: [''],
        color: 'blue',
        isPopular: false,
        active: true
    });

    const handleAddFeature = () => {
        setNewSubscription(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...newSubscription.features];
        updatedFeatures[index] = value;
        setNewSubscription(prev => ({
            ...prev,
            features: updatedFeatures
        }));
    };

    const handleRemoveFeature = (index) => {
        setNewSubscription(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            // Validate inputs
            if (!newSubscription.name || !newSubscription.price) {
                throw new Error('Please fill in all required fields');
            }

            // Create new subscription
            const subscriptionData = {
                ...newSubscription,
                id: 'sub_' + Math.random().toString(36).substr(2, 9),
                price: parseFloat(newSubscription.price),
                features: newSubscription.features.filter(f => f.trim() !== '')
            };

            // Add to list
            setSubscriptions(prev => [...prev, subscriptionData]);
            setSuccess('Subscription package added successfully');
            setShowAddForm(false);
            setNewSubscription({
                name: '',
                price: '',
                duration: 'monthly',
                features: [''],
                color: 'blue',
                isPopular: false,
                active: true
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
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

            {/* Add Subscription Form */}
            {showAddForm && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Add New Package</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Package Name</label>
                                <input
                                    type="text"
                                    value={newSubscription.name}
                                    onChange={(e) => setNewSubscription(prev => ({...prev, name: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    value={newSubscription.price}
                                    onChange={(e) => setNewSubscription(prev => ({...prev, price: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Duration</label>
                                <select
                                    value={newSubscription.duration}
                                    onChange={(e) => setNewSubscription(prev => ({...prev, duration: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Color Theme</label>
                                <select
                                    value={newSubscription.color}
                                    onChange={(e) => setNewSubscription(prev => ({...prev, color: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                >
                                    <option value="blue">Blue</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="purple">Purple</option>
                                    <option value="green">Green</option>
                                </select>
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-white/60 text-sm mb-1">Features</label>
                            {newSubscription.features.map((feature, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                        placeholder="Enter feature"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFeature(index)}
                                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddFeature}
                                className="text-yellow-400 text-sm hover:text-yellow-300"
                            >
                                + Add Feature
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-white/60">
                                <input
                                    type="checkbox"
                                    checked={newSubscription.isPopular}
                                    onChange={(e) => setNewSubscription(prev => ({...prev, isPopular: e.target.checked}))}
                                    className="form-checkbox bg-white/5 border border-white/10 rounded text-yellow-400"
                                />
                                Mark as Popular
                            </label>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm">{error}</div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20 disabled:opacity-50"
                            >
                                {loading ? 'Adding...' : 'Add Package'}
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
                                onClick={() => {/* Handle edit */}}
                                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => {/* Handle delete */}}
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