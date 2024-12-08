import React from 'react';
import AnalyticsSection from './AnalyticsSection';
import ErrorBoundary from './ErrorBoundary';

const AnalyticsDashboard = () => {
    // Dummy data for analytics
    const analyticsData = {
        userEngagement: [
            { name: 'Mon', students: 120, instructors: 20 },
            { name: 'Tue', students: 150, instructors: 25 },
            { name: 'Wed', students: 180, instructors: 30 },
            { name: 'Thu', students: 160, instructors: 28 },
            { name: 'Fri', students: 200, instructors: 35 },
            { name: 'Sat', students: 250, instructors: 40 },
            { name: 'Sun', students: 220, instructors: 38 }
        ],
        courseProgress: [
            { name: 'Week 1', completed: 85, inProgress: 120, notStarted: 45 },
            { name: 'Week 2', completed: 95, inProgress: 110, notStarted: 40 },
            { name: 'Week 3', completed: 125, inProgress: 90, notStarted: 35 },
            { name: 'Week 4', completed: 150, inProgress: 70, notStarted: 30 }
        ],
        loginActivity: [
            { time: '6AM', logins: 20 },
            { time: '9AM', logins: 80 },
            { time: '12PM', logins: 150 },
            { time: '3PM', logins: 120 },
            { time: '6PM', logins: 180 },
            { time: '9PM', logins: 90 },
            { time: '12AM', logins: 40 }
        ],
        contentDistribution: [
            { name: 'Video Lessons', value: 45 },
            { name: 'Quizzes', value: 25 },
            { name: 'Assignments', value: 20 },
            { name: 'Live Sessions', value: 10 }
        ]
    };

    return (
        <div className="space-y-6">
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
                </div>
                <ErrorBoundary>
                    <AnalyticsSection initialData={analyticsData} />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default AnalyticsDashboard; 