import React, { useState } from 'react';
import { FaVideo, FaUser, FaClock, FaCheck, FaTimes, FaEye } from 'react-icons/fa';

const ContentApprovalDashboard = () => {
    const [selectedContent, setSelectedContent] = useState(null);
    const [requests, setRequests] = useState([
        {
            id: 1,
            type: 'video',
            title: 'Introduction to React Hooks',
            description: 'A comprehensive guide to React Hooks including useState, useEffect, and custom hooks.',
            instructor: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                avatar: 'https://ui-avatars.com/api/?name=John+Doe'
            },
            course: 'Advanced React Development',
            duration: '45 minutes',
            submittedAt: '2023-12-20T10:30:00',
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://example.com/video1.mp4',
            status: 'pending'
        },
        {
            id: 2,
            type: 'video',
            title: 'Node.js Authentication',
            description: 'Learn how to implement JWT authentication in Node.js applications.',
            instructor: {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
            },
            course: 'Backend Development',
            duration: '55 minutes',
            submittedAt: '2023-12-19T15:45:00',
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://example.com/video2.mp4',
            status: 'pending'
        },
        {
            id: 3,
            type: 'video',
            title: 'Database Design Patterns',
            description: 'Understanding common database design patterns and best practices.',
            instructor: {
                name: 'Mike Johnson',
                email: 'mike.johnson@example.com',
                avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson'
            },
            course: 'Database Management',
            duration: '35 minutes',
            submittedAt: '2023-12-18T09:15:00',
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://example.com/video3.mp4',
            status: 'pending'
        },
        {
            id: 4,
            type: 'video',
            title: 'Advanced CSS Animations',
            description: 'Master CSS animations and transitions for modern web applications.',
            instructor: {
                name: 'Sarah Wilson',
                email: 'sarah.wilson@example.com',
                avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson'
            },
            course: 'Frontend Development',
            duration: '50 minutes',
            submittedAt: '2023-12-17T14:20:00',
            thumbnailUrl: 'https://placehold.co/600x400',
            videoUrl: 'https://example.com/video4.mp4',
            status: 'pending'
        }
    ]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const handleApprove = (contentId) => {
        setRequests(requests.map(request => 
            request.id === contentId 
                ? { ...request, status: 'approved' }
                : request
        ));
        setSelectedContent(null);
    };

    const handleReject = (contentId) => {
        setRequests(requests.map(request => 
            request.id === contentId 
                ? { ...request, status: 'rejected' }
                : request
        ));
        setSelectedContent(null);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                        Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm">
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm">
                        Pending Review
                    </span>
                );
        }
    };

    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedContent(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h1 className="text-2xl font-bold text-white mb-6">Content Approval Requests</h1>
                
                <div className="grid grid-cols-1 gap-6">
                    {requests.map((request) => (
                        <div 
                            key={request.id}
                            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:bg-white/[0.15] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <img 
                                        src={request.instructor.avatar} 
                                        alt={request.instructor.name}
                                        className="w-12 h-12 rounded-full border-2 border-yellow-400/20"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{request.title}</h3>
                                        <div className="flex items-center text-white/60 text-sm space-x-4 mt-1">
                                            <span className="flex items-center">
                                                <FaUser className="mr-1" />
                                                {request.instructor.name}
                                            </span>
                                            <span className="flex items-center">
                                                <FaVideo className="mr-1" />
                                                {request.duration}
                                            </span>
                                            <span className="flex items-center">
                                                <FaClock className="mr-1" />
                                                {formatDate(request.submittedAt)}
                                            </span>
                                        </div>
                                        <p className="text-white/80 mt-2 line-clamp-2">{request.description}</p>
                                    </div>
                                </div>

                                {getStatusBadge(request.status)}
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => setSelectedContent(request)}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors flex items-center"
                                >
                                    <FaEye className="mr-2" />
                                    View Details
                                </button>
                                {request.status === 'pending' && (
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleApprove(request.id)}
                                            className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors flex items-center"
                                        >
                                            <FaCheck className="mr-2" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(request.id)}
                                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center"
                                        >
                                            <FaTimes className="mr-2" />
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal with improved closing behavior */}
            {selectedContent && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
                    onClick={handleCloseModal}
                >
                    <div 
                        className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 max-w-2xl w-full m-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold text-white">{selectedContent.title}</h2>
                            <button 
                                onClick={() => setSelectedContent(null)}
                                className="text-white/60 hover:text-white transition-colors p-2"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <img 
                                src={selectedContent.thumbnailUrl} 
                                alt={selectedContent.title}
                                className="w-full rounded-lg"
                            />
                            
                            <div className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-white font-semibold mb-2">Instructor Details</h3>
                                <div className="flex items-center space-x-3">
                                    <img 
                                        src={selectedContent.instructor.avatar}
                                        alt={selectedContent.instructor.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="text-white">{selectedContent.instructor.name}</p>
                                        <p className="text-white/60 text-sm">{selectedContent.instructor.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">Description</h3>
                                <p className="text-white/80">{selectedContent.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="text-white/60 text-sm">Course</h4>
                                    <p className="text-white">{selectedContent.course}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="text-white/60 text-sm">Duration</h4>
                                    <p className="text-white">{selectedContent.duration}</p>
                                </div>
                            </div>

                            {selectedContent.status === 'pending' && (
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={() => handleApprove(selectedContent.id)}
                                        className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors"
                                    >
                                        Approve Content
                                    </button>
                                    <button
                                        onClick={() => handleReject(selectedContent.id)}
                                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                    >
                                        Reject Content
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentApprovalDashboard; 