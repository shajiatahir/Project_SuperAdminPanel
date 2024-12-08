const User = require('../../auth/models/userModel');
const Course = require('../../courses/models/courseModel');
const Video = require('../../videos/models/videoModel');
const Payment = require('../models/paymentModel');
const ContentApproval = require('../models/contentApprovalModel');

class AnalyticsService {
    async getAnalytics(timeRange) {
        try {
            // Get user engagement data
            const userEngagementData = [
                { name: 'Mon', students: 120, instructors: 20 },
                { name: 'Tue', students: 150, instructors: 25 },
                { name: 'Wed', students: 180, instructors: 30 },
                { name: 'Thu', students: 160, instructors: 28 },
                { name: 'Fri', students: 200, instructors: 35 },
                { name: 'Sat', students: 250, instructors: 40 },
                { name: 'Sun', students: 220, instructors: 38 }
            ];

            // Get course progress data
            const courseProgressData = [
                { name: 'Week 1', completed: 85, inProgress: 120, notStarted: 45 },
                { name: 'Week 2', completed: 95, inProgress: 110, notStarted: 40 },
                { name: 'Week 3', completed: 125, inProgress: 90, notStarted: 35 },
                { name: 'Week 4', completed: 150, inProgress: 70, notStarted: 30 }
            ];

            // Get login activity data
            const loginTimeData = [
                { time: '6AM', logins: 20 },
                { time: '9AM', logins: 80 },
                { time: '12PM', logins: 150 },
                { time: '3PM', logins: 120 },
                { time: '6PM', logins: 180 },
                { time: '9PM', logins: 90 },
                { time: '12AM', logins: 40 }
            ];

            // Get content distribution data
            const contentDistributionData = [
                { name: 'Video Lessons', value: 45 },
                { name: 'Quizzes', value: 25 },
                { name: 'Assignments', value: 20 },
                { name: 'Live Sessions', value: 10 }
            ];

            return {
                userEngagement: userEngagementData,
                courseProgress: courseProgressData,
                loginActivity: loginTimeData,
                contentDistribution: contentDistributionData,
                userGrowth: {
                    current: 1500,
                    change: 12.5
                },
                revenue: {
                    current: 25000,
                    change: 8.3
                }
            };
        } catch (error) {
            console.error('Analytics service error:', error);
            throw new Error('Failed to fetch analytics data');
        }
    }

    async getDashboardStats() {
        try {
            const [
                totalStudents,
                totalCourses,
                totalVideos,
                totalRevenue,
                pendingApprovals
            ] = await Promise.all([
                User.countDocuments({ roles: 'student' }),
                Course.countDocuments({ isPublished: true }),
                Video.countDocuments({ isPublished: true }),
                Payment.aggregate([
                    { $match: { status: 'completed' } },
                    { $group: { _id: null, total: { $sum: '$amount' } } }
                ]),
                ContentApproval.countDocuments({ status: 'pending' })
            ]);

            return {
                totalStudents,
                totalCourses,
                totalVideos,
                totalRevenue: totalRevenue[0]?.total || 0,
                pendingApprovals
            };
        } catch (error) {
            throw new Error('Error fetching dashboard stats');
        }
    }

    async getEngagementMetrics(timeRange) {
        const dateRange = this.getDateRange(timeRange);
        try {
            const [courseEnrollments, videoViews] = await Promise.all([
                this.getCourseEnrollments(dateRange),
                this.getVideoViews(dateRange)
            ]);

            return {
                courseEnrollments,
                videoViews
            };
        } catch (error) {
            throw new Error('Error fetching engagement metrics');
        }
    }

    async getRevenueMetrics(timeRange) {
        const dateRange = this.getDateRange(timeRange);
        try {
            const revenue = await Payment.aggregate([
                {
                    $match: {
                        status: 'completed',
                        createdAt: { $gte: dateRange.start, $lte: dateRange.end }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                        },
                        total: { $sum: '$amount' }
                    }
                },
                { $sort: { '_id': 1 } }
            ]);

            return revenue;
        } catch (error) {
            throw new Error('Error fetching revenue metrics');
        }
    }

    getDateRange(timeRange) {
        const end = new Date();
        const start = new Date();

        switch (timeRange) {
            case 'week':
                start.setDate(start.getDate() - 7);
                break;
            case 'month':
                start.setMonth(start.getMonth() - 1);
                break;
            case 'year':
                start.setFullYear(start.getFullYear() - 1);
                break;
            default:
                start.setMonth(start.getMonth() - 1);
        }

        return { start, end };
    }

    async getCourseEnrollments(dateRange) {
        try {
            const enrollments = await Course.aggregate([
                {
                    $match: {
                        createdAt: { $gte: dateRange.start, $lte: dateRange.end }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                        },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { '_id': 1 } }
            ]);

            return enrollments;
        } catch (error) {
            throw new Error('Error fetching course enrollments');
        }
    }

    async getVideoViews(dateRange) {
        try {
            const views = await Video.aggregate([
                {
                    $match: {
                        createdAt: { $gte: dateRange.start, $lte: dateRange.end }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                        },
                        views: { $sum: '$viewCount' }
                    }
                },
                { $sort: { '_id': 1 } }
            ]);

            return views;
        } catch (error) {
            throw new Error('Error fetching video views');
        }
    }
}

module.exports = new AnalyticsService(); 