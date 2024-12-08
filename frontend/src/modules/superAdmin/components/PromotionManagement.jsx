import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTag } from 'react-icons/fa';

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
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        maxUses: '',
        validFrom: '',
        validUntil: '',
        description: '',
        status: 'active'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            const newPromotion = {
                id: editingPromotion?.id || `promo_${Math.random().toString(36).substr(2, 9)}`,
                ...formData,
                usedCount: editingPromotion?.usedCount || 0
            };

            if (editingPromotion) {
                // Update existing promotion
                setPromotions(prev => prev.map(promo => 
                    promo.id === editingPromotion.id ? newPromotion : promo
                ));
                setSuccess('Promotion updated successfully');
                setEditingPromotion(null);
            } else {
                // Add new promotion
                setPromotions(prev => [...prev, newPromotion]);
                setSuccess('Promotion added successfully');
            }

            // Reset form
            setFormData({
                code: '',
                discountType: 'percentage',
                discountValue: '',
                maxUses: '',
                validFrom: '',
                validUntil: '',
                description: '',
                status: 'active'
            });
            setShowAddForm(false);
        } catch (error) {
            setError('Failed to save promotion');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (promotion) => {
        setEditingPromotion(promotion);
        setFormData({
            code: promotion.code,
            discountType: promotion.discountType,
            discountValue: promotion.discountValue,
            maxUses: promotion.maxUses,
            validFrom: promotion.validFrom,
            validUntil: promotion.validUntil,
            description: promotion.description,
            status: promotion.status
        });
        setShowAddForm(true);
    };

    const handleDelete = (promotionId) => {
        if (window.confirm('Are you sure you want to delete this promotion?')) {
            setPromotions(prev => prev.filter(promo => promo.id !== promotionId));
            setSuccess('Promotion deleted successfully');
        }
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setEditingPromotion(null);
        setFormData({
            code: '',
            discountType: 'percentage',
            discountValue: '',
            maxUses: '',
            validFrom: '',
            validUntil: '',
            description: '',
            status: 'active'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-400 bg-green-400/10';
            case 'scheduled': return 'text-yellow-400 bg-yellow-400/10';
            case 'expired': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Promotion Management</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20"
                >
                    <FaPlus className="mr-2" />
                    Add Promotion
                </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        {editingPromotion ? 'Edit Promotion' : 'Add New Promotion'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Promotion Code</label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Discount Type</label>
                                <select
                                    value={formData.discountType}
                                    onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                >
                                    <option value="percentage">Percentage</option>
                                    <option value="fixed">Fixed Amount</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Discount Value</label>
                                <input
                                    type="number"
                                    value={formData.discountValue}
                                    onChange={(e) => setFormData({...formData, discountValue: parseFloat(e.target.value)})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Max Uses</label>
                                <input
                                    type="number"
                                    value={formData.maxUses}
                                    onChange={(e) => setFormData({...formData, maxUses: parseInt(e.target.value)})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Valid From</label>
                                <input
                                    type="date"
                                    value={formData.validFrom}
                                    onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-sm mb-1">Valid Until</label>
                                <input
                                    type="date"
                                    value={formData.validUntil}
                                    onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                rows="3"
                                required
                            />
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
                                {loading ? 'Saving...' : editingPromotion ? 'Update Promotion' : 'Add Promotion'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Promotion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions.map((promotion) => (
                    <div
                        key={promotion.id}
                        className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{promotion.code}</h3>
                                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(promotion.status)}`}>
                                    {promotion.status}
                                </span>
                            </div>
                            <div className="p-2 rounded-lg bg-yellow-400/10">
                                <FaTag className="text-yellow-400" />
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <p className="text-white/80">{promotion.description}</p>
                            <p className="text-white font-semibold">
                                {promotion.discountType === 'percentage' ? 
                                    `${promotion.discountValue}% off` : 
                                    `$${promotion.discountValue} off`}
                            </p>
                            <p className="text-white/60 text-sm">
                                Used: {promotion.usedCount} / {promotion.maxUses}
                            </p>
                            <p className="text-white/60 text-sm">
                                Valid: {new Date(promotion.validFrom).toLocaleDateString()} - {new Date(promotion.validUntil).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => handleEdit(promotion)}
                                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(promotion.id)}
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

export default PromotionManagement; 