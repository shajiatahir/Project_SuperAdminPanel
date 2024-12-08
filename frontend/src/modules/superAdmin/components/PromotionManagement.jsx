import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTag, FaCalendar, FaUsers } from 'react-icons/fa';

const INITIAL_PROMOTIONS = [
    {
        id: 'promo_1',
        code: 'EARLYBIRD2024',
        discountType: 'percentage',
        discountValue: 20,
        maxUses: 100,
        usedCount: 45,
        validFrom: '2024-01-01',
        validUntil: '2024-02-29',
        description: 'Early bird discount for new courses',
        status: 'active'
    },
    {
        id: 'promo_2',
        code: 'SUMMER30',
        discountType: 'percentage',
        discountValue: 30,
        maxUses: 200,
        usedCount: 0,
        validFrom: '2024-06-01',
        validUntil: '2024-08-31',
        description: 'Summer special discount',
        status: 'scheduled'
    },
    {
        id: 'promo_3',
        code: 'FLAT50',
        discountType: 'fixed',
        discountValue: 50,
        maxUses: 50,
        usedCount: 50,
        validFrom: '2023-12-01',
        validUntil: '2023-12-31',
        description: 'Holiday season flat discount',
        status: 'expired'
    }
];

const PromotionManagement = () => {
    const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [newPromotion, setNewPromotion] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        maxUses: '',
        validFrom: '',
        validUntil: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            // Validate inputs
            if (!newPromotion.code || !newPromotion.discountValue) {
                throw new Error('Please fill in all required fields');
            }

            // Create new promotion
            const promotionData = {
                ...newPromotion,
                id: 'promo_' + Math.random().toString(36).substr(2, 9),
                usedCount: 0,
                status: 'active'
            };

            // Add to list
            setPromotions(prev => [...prev, promotionData]);
            setSuccess('Promotion created successfully');
            setShowAddForm(false);
            setNewPromotion({
                code: '',
                discountType: 'percentage',
                discountValue: '',
                maxUses: '',
                validFrom: '',
                validUntil: '',
                description: ''
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-400 bg-green-400/10';
            case 'scheduled': return 'text-blue-400 bg-blue-400/10';
            case 'expired': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Create Promotion</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                >
                    <FaPlus className="mr-2" />
                    Add Promotion
                </button>
            </div>

            {/* Add Promotion Form */}
            {showAddForm && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Promotion Code</label>
                                <input
                                    type="text"
                                    value={newPromotion.code}
                                    onChange={(e) => setNewPromotion(prev => ({...prev, code: e.target.value.toUpperCase()}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Discount Type</label>
                                <select
                                    value={newPromotion.discountType}
                                    onChange={(e) => setNewPromotion(prev => ({...prev, discountType: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                >
                                    <option value="percentage">Percentage</option>
                                    <option value="fixed">Fixed Amount</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">
                                    {newPromotion.discountType === 'percentage' ? 'Discount (%)' : 'Discount Amount ($)'}
                                </label>
                                <input
                                    type="number"
                                    value={newPromotion.discountValue}
                                    onChange={(e) => setNewPromotion(prev => ({...prev, discountValue: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Max Uses</label>
                                <input
                                    type="number"
                                    value={newPromotion.maxUses}
                                    onChange={(e) => setNewPromotion(prev => ({...prev, maxUses: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Valid From</label>
                                <input
                                    type="date"
                                    value={newPromotion.validFrom}
                                    onChange={(e) => setNewPromotion(prev => ({...prev, validFrom: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Valid Until</label>
                                <input
                                    type="date"
                                    value={newPromotion.validUntil}
                                    onChange={(e) => setNewPromotion(prev => ({...prev, validUntil: e.target.value}))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm mb-1">Description</label>
                            <textarea
                                value={newPromotion.description}
                                onChange={(e) => setNewPromotion(prev => ({...prev, description: e.target.value}))}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                rows="3"
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm">{error}</div>
                        )}

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-6 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Promotion'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Active Promotions */}
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Active Promotions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {promotions.map((promotion) => (
                        <div
                            key={promotion.id}
                            className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaTag className="text-yellow-400" />
                                        <h4 className="text-lg font-semibold text-white">{promotion.code}</h4>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(promotion.status)}`}>
                                        {promotion.status}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">
                                        {promotion.discountType === 'percentage' ? `${promotion.discountValue}%` : `$${promotion.discountValue}`}
                                    </div>
                                    <div className="text-white/60 text-sm">
                                        {promotion.maxUses ? `${promotion.usedCount}/${promotion.maxUses} used` : 'Unlimited'}
                                    </div>
                                </div>
                            </div>

                            <p className="text-white/80 mb-4">{promotion.description}</p>

                            <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                                <div className="flex items-center gap-1">
                                    <FaCalendar />
                                    <span>{new Date(promotion.validFrom).toLocaleDateString()} - {new Date(promotion.validUntil).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaUsers />
                                    <span>{promotion.usedCount} uses</span>
                                </div>
                            </div>

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
        </div>
    );
};

export default PromotionManagement; 