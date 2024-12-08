import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';

// Initial dummy content data
const INITIAL_CONTENT = [
    {
        id: 'content_1',
        title: 'Advanced React Patterns',
        description: 'Learn advanced React patterns and best practices',
        instructor: 'John Doe',
        thumbnail: '/images/content-thumbnails/reactlearn.jpg', // Updated path
        status: 'pending',
        submittedAt: '2024-01-15T10:30:00Z',
        category: 'Development'
    },
    {
        id: 'content_2',
        title: 'Node.js Masterclass',
        description: 'Complete Node.js development course',
        instructor: 'Jane Smith',
        thumbnail: '/images/content-thumbnails/reactlearn.jpg', // Updated path
        status: 'pending',
        submittedAt: '2024-01-16T14:20:00Z',
        category: 'Backend'
    }
];

const ContentApproval = () => {
    const [contents, setContents] = useState(INITIAL_CONTENT);
    const [selectedContent, setSelectedContent] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleApprove = async (contentId) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setContents(prev => prev.map(content => 
                content.id === contentId 
                    ? { ...content, status: 'approved' }
                    : content
            ));
        } catch (error) {
            console.error('Failed to approve content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (contentId) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setContents(prev => prev.map(content => 
                content.id === contentId 
                    ? { ...content, status: 'rejected' }
                    : content
            ));
        } catch (error) {
            console.error('Failed to reject content:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Content Approvals</h2>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contents.map((content) => (
                    <div 
                        key={content.id}
                        className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                        {/* Thumbnail */}
                        <div className="relative aspect-video group">
                            <img
                                src={content.thumbnail}
                                alt={content.title}
                                className="w-full h-full object-cover rounded-t-xl"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/placeholder.jpg'; // Add a placeholder image for fallback
                                }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => setSelectedContent(content)}
                                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors"
                                >
                                    <FaEye className="inline-block mr-2" />
                                    Preview
                                </button>
                            </div>
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    content.status === 'approved' ? 'bg-green-400/10 text-green-400' :
                                    content.status === 'rejected' ? 'bg-red-400/10 text-red-400' :
                                    'bg-yellow-400/10 text-yellow-400'
                                }`}>
                                    {content.status}
                                </span>
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white mb-2">{content.title}</h3>
                            <p className="text-white/60 text-sm mb-4">{content.description}</p>
                            
                            <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                                <span>{content.instructor}</span>
                                <span>{content.category}</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between gap-2">
                                {content.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(content.id)}
                                            disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-400/10 text-green-400 rounded-lg hover:bg-green-400/20"
                                        >
                                            <FaCheck />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(content.id)}
                                            disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-400/10 text-red-400 rounded-lg hover:bg-red-400/20"
                                        >
                                            <FaTimes />
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {selectedContent && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 p-6 max-w-2xl w-full mx-4">
                        <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                            <img
                                src={selectedContent.thumbnail}
                                alt={selectedContent.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{selectedContent.title}</h3>
                        <p className="text-white/60 mb-4">{selectedContent.description}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentApproval; 