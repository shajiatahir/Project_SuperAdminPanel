import React, { useState } from 'react';
import { FaTimes, FaGraduationCap } from 'react-icons/fa';
import { useCourse } from '../context/CourseContext';
import { validateCourse } from '../utils/validation';
import ContentSelector from './ContentSelector';

const CreateCourseForm = () => {
    const { handleCourseCreate, setIsCreateModalOpen } = useCourse();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficultyLevel: '',
        sequence: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showContentSelector, setShowContentSelector] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleContentAdded = (content) => {
        setFormData(prev => ({
            ...prev,
            sequence: [...prev.sequence, content]
        }));
        setShowContentSelector(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateCourse(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsSubmitting(true);
        try {
            await handleCourseCreate(formData);
            setIsCreateModalOpen(false);
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemoveContent = (index) => {
        setFormData(prev => ({
            ...prev,
            sequence: prev.sequence.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-purple-700/50 via-indigo-600/50 to-blue-500/50 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header - Fixed */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center">
                        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 p-3 rounded-full mr-4">
                            <FaGraduationCap className="text-yellow-300 text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Create New Course</h2>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(false)}
                        className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Form - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-white/80 mb-2 text-sm font-medium">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter course title"
                                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                                    errors.title ? 'border-red-400' : 'border-white/10'
                                } text-white placeholder-white/30 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/50 transition duration-200`}
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red-400">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-white/80 mb-2 text-sm font-medium">Course Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter course description"
                                rows="4"
                                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                                    errors.description ? 'border-red-400' : 'border-white/10'
                                } text-white placeholder-white/30 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/50 transition duration-200`}
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-400">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-white/80 mb-2 text-sm font-medium">Difficulty Level</label>
                            <select
                                name="difficultyLevel"
                                value={formData.difficultyLevel}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                                    errors.difficultyLevel ? 'border-red-400' : 'border-white/10'
                                } text-white focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/50 transition duration-200`}
                            >
                                <option value="" className="bg-gray-800">Select Difficulty Level</option>
                                <option value="beginner" className="bg-gray-800">Beginner</option>
                                <option value="intermediate" className="bg-gray-800">Intermediate</option>
                                <option value="advanced" className="bg-gray-800">Advanced</option>
                            </select>
                            {errors.difficultyLevel && (
                                <p className="mt-2 text-sm text-red-400">{errors.difficultyLevel}</p>
                            )}
                        </div>

                        {/* Course Content */}
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Course Content</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowContentSelector(true)}
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium hover:from-yellow-300 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 transform hover:scale-105 transition duration-200"
                                >
                                    Add Content
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.sequence.length === 0 ? (
                                    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
                                        <p className="text-white/60">
                                            No content added yet. Click "Add Content" to start building your course.
                                        </p>
                                    </div>
                                ) : (
                                    formData.sequence.map((item, index) => (
                                        <div
                                            key={`${item.contentType}-${item.contentId}-${index}`}
                                            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <span className="w-8 h-8 flex items-center justify-center bg-yellow-300/20 rounded-full text-yellow-300 mr-4">
                                                        {index + 1}
                                                    </span>
                                                    <div>
                                                        <h4 className="text-white font-medium">{item.title}</h4>
                                                        <p className="text-white/40 text-sm">
                                                            {item.contentType === 'video' ? 'Video Lesson' : 'Quiz Assessment'}
                                                            {item.duration && ` • ${item.duration}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveContent(index)}
                                                    className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/20 rounded-lg transition-colors"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {errors.submit && (
                            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                                {errors.submit}
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer - Fixed */}
                <div className="border-t border-white/10 p-6">
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold hover:from-yellow-300 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 transform hover:scale-105 transition duration-200 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Course'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Selector Modal */}
            {showContentSelector && (
                <ContentSelector
                    onClose={() => setShowContentSelector(false)}
                    onContentSelected={handleContentAdded}
                />
            )}
        </div>
    );
};

export default CreateCourseForm; 