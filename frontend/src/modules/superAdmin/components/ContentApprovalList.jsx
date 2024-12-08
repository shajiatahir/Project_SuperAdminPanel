import React, { useState, useEffect } from 'react';
import { FaVideo, FaGraduationCap, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import superAdminService from '../services/superAdminService';

const ContentApprovalList = ({ preview = false, limit }) => {
    const [pendingContent, setPendingContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedContent, setSelectedContent] = useState(null);

    useEffect(() => {
        fetchPendingContent();
    }, []);

    const fetchPendingContent = async () => {
        try {
            setLoading(true);
            const response = await superAdminService.getPendingContent();
            setPendingContent(response.data);
        } catch (error) {
            setError('Failed to fetch pending content');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (contentId) => {
        try {
            await superAdminService.approveContent(contentId);
            fetchPendingContent();
        } catch (error) {
            setError('Failed to approve content');
        }
    };

    const handleReject = async (contentId) => {
        try {
            await superAdminService.rejectContent(contentId);
            fetchPendingContent();
        } catch (error) {
            setError('Failed to reject content');
        }
    };

    const displayContent = preview && limit ? pendingContent.slice(0, limit) : pendingContent;

    const ContentCard = ({ content }) => (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:bg-white/[0.15] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    {content.type === 'course' ? (
                        <FaGraduationCap className="text-yellow-400 text-xl mr-3" />
                    ) : (
                        <FaVideo className="text-yellow-400 text-xl mr-3" />
                    )}
                    <div>
                        <h3 className="text-white font-semibold">{content.title}</h3>
                        <p className="text-white/60 text-sm">
                            by {content.instructor.name}
                        </p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm">
                    Pending Review
                </span>
            </div>

            <p className="text-white/80 mb-4 line-clamp-2">{content.description}</p>

            <div className="flex justify-between items-center">
                <button
                    onClick={() => setSelectedContent(content)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors flex items-center"
                >
                    <FaEye className="mr-2" />
                    View Details
                </button>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleApprove(content._id)}
                        className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors flex items-center"
                    >
                        <FaCheck className="mr-2" />
                        Approve
                    </button>
                    <button
                        onClick={() => handleReject(content._id)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center"
                    >
                        <FaTimes className="mr-2" />
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-400 text-center py-8">
                {error}
            </div>
        );
    }

    if (preview) {
        return (
            <div className="space-y-4">
                {displayContent.map((content) => (
                    <div key={content._id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {content.type === 'course' ? (
                                    <FaGraduationCap className="text-yellow-400 text-xl mr-3" />
                                ) : (
                                    <FaVideo className="text-yellow-400 text-xl mr-3" />
                                )}
                                <div>
                                    <h4 className="text-white font-medium">{content.title}</h4>
                                    <p className="text-white/60 text-sm">by {content.instructor.name}</p>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs">
                                Pending
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                    Pending Content Approvals
                </h2>
            </div>

            {pendingContent.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-xl">
                    <p className="text-white/60">No pending content to review</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pendingContent.map((content) => (
                        <ContentCard key={content._id} content={content} />
                    ))}
                </div>
            )}

            {/* Content Detail Modal */}
            {selectedContent && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 max-w-2xl w-full">
                        {/* Add detailed content view here */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentApprovalList; 