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
            thumbnailUrl: '/images/content-thumbnails/reactlearn.jpg',
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
            thumbnailUrl: '/images/content-thumbnails/nodejs.jpg',
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
            thumbnailUrl: '/images/content-thumbnails/db.jpg',
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
            thumbnailUrl: '/images/content-thumbnails/css.jpg',
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
                return <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">Approved</span>;
            case 'rejected':
                return <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm">Rejected</span>;
            default:
                return <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm">Pending Review</span>;
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
                            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:bg-white/[0.15] transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedContent(request)}
                        >
                            <div className="flex gap-6">
                                {/* Thumbnail Preview */}
                                <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                    <img 
                                        src={request.thumbnailUrl}
                                        alt={request.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                </div>

                                {/* Content Details */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
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
                                        {getStatusBadge(request.status)}
                                    </div>

                                    {request.status === 'pending' && (
                                        <div className="flex justify-end space-x-3 mt-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleApprove(request.id);
                                                }}
                                                className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors flex items-center"
                                            >
                                                <FaCheck className="mr-2" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReject(request.id);
                                                }}
                                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center"
                                            >
                                                <FaTimes className="mr-2" />
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preview Modal */}
            {selectedContent && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedContent(null)}
                >
                    <div 
                        className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 max-w-3xl w-full"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header with close button */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Content Review</h2>
                            <button 
                                onClick={() => setSelectedContent(null)}
                                className="text-white/60 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex gap-6">
                            {/* Left side - Image */}
                            <div className="w-1/3 flex-shrink-0">
                                <div className="rounded-lg overflow-hidden">
                                    <img 
                                        src={selectedContent.thumbnailUrl}
                                        alt={selectedContent.title}
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Right side - Content Details */}
                            <div className="flex-1 space-y-4">
                                {/* Title and Status */}
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold text-white">{selectedContent.title}</h3>
                                    {getStatusBadge(selectedContent.status)}
                                </div>

                                {/* Instructor Info */}
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="text-white/80 text-sm font-semibold mb-2">Instructor</h4>
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={selectedContent.instructor.avatar} 
                                            alt={selectedContent.instructor.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-white font-medium">{selectedContent.instructor.name}</p>
                                            <p className="text-white/60 text-sm">{selectedContent.instructor.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="text-white/80 text-sm font-semibold mb-2">Course Details</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-white/60">Course</p>
                                            <p className="text-white">{selectedContent.course}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Duration</p>
                                            <p className="text-white">{selectedContent.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Submitted</p>
                                            <p className="text-white">{formatDate(selectedContent.submittedAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60">Content Type</p>
                                            <p className="text-white capitalize">{selectedContent.type}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="text-white/80 text-sm font-semibold mb-2">Description</h4>
                                    <p className="text-white/80 text-sm">{selectedContent.description}</p>
                                </div>

                                {/* Action Buttons */}
                                {selectedContent.status === 'pending' && (
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            onClick={() => handleApprove(selectedContent.id)}
                                            className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors flex items-center"
                                        >
                                            <FaCheck className="mr-2" />
                                            Approve Content
                                        </button>
                                        <button
                                            onClick={() => handleReject(selectedContent.id)}
                                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center"
                                        >
                                            <FaTimes className="mr-2" />
                                            Reject Content
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentApprovalDashboard; 