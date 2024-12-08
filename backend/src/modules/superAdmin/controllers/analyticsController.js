const AnalyticsService = require('../services/analyticsService');

class AnalyticsController {
    async getAnalytics(req, res) {
        try {
            const { timeRange } = req.query;
            const analyticsData = await AnalyticsService.getAnalytics(timeRange);

            res.json({
                success: true,
                data: analyticsData
            });
        } catch (error) {
            console.error('Get analytics error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch analytics data'
            });
        }
    }
}

module.exports = new AnalyticsController(); 