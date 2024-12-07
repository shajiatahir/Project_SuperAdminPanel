import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const PromotionManagement = () => {
    const [promotions, setPromotions] = useState([]);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        validFrom: '',
        validUntil: '',
        maxUses: ''
    });

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await superAdminService.getAllPromotions();
            setPromotions(response.data);
        } catch (error) {
            setError('Failed to fetch promotions');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPromotion) {
                await superAdminService.updatePromotion(editingPromotion._id, formData);
                setSuccess('Promotion updated successfully');
            } else {
                await superAdminService.createPromotion(formData);
                setSuccess('Promotion created successfully');
            }
            setEditingPromotion(null);
            resetForm();
            fetchPromotions();
        } catch (error) {
            setError(error.message || 'Failed to save promotion');
        }
    };

    const handleDeletePromotion = async (id) => {
        if (window.confirm('Are you sure you want to delete this promotion?')) {
            try {
                await superAdminService.deletePromotion(id);
                setSuccess('Promotion deleted successfully');
                fetchPromotions();
            } catch (error) {
                setError('Failed to delete promotion');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            code: '',
            description: '',
            discountType: 'percentage',
            discountValue: '',
            validFrom: '',
            validUntil: '',
            maxUses: ''
        });
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Promotion Management
            </h1>

            {/* Promotion Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    {editingPromotion ? 'Edit' : 'Create'} Promotion
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
                            <label className="block text-gray-700 mb-2">Promotion Code</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Discount Type</label>
                            <select
                                name="discountType"
                                value={formData.discountType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                            >
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed Amount</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Discount Value</label>
                            <input
                                type="number"
                                name="discountValue"
                                value={formData.discountValue}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Max Uses</label>
                            <input
                                type="number"
                                name="maxUses"
                                value={formData.maxUses}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Valid From</label>
                            <input
                                type="datetime-local"
                                name="validFrom"
                                value={formData.validFrom}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Valid Until</label>
                            <input
                                type="datetime-local"
                                name="validUntil"
                                value={formData.validUntil}
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

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                        >
                            {editingPromotion ? 'Update' : 'Create'} Promotion
                        </button>
                    </div>
                </form>
            </div>

            {/* Promotions List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Active Promotions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promotions.map((promotion) => (
                        <div
                            key={promotion._id}
                            className="border rounded-lg p-4 hover:shadow-lg transition duration-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{promotion.code}</h3>
                                    <p className="text-sm text-gray-500">
                                        {promotion.discountType === 'percentage' 
                                            ? `${promotion.discountValue}% off`
                                            : `$${promotion.discountValue} off`}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingPromotion(promotion)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePromotion(promotion._id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{promotion.description}</p>
                            <div className="text-sm text-gray-500">
                                <p>Valid: {new Date(promotion.validFrom).toLocaleDateString()} - {new Date(promotion.validUntil).toLocaleDateString()}</p>
                                <p>Uses: {promotion.currentUses} / {promotion.maxUses || '∞'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromotionManagement; 