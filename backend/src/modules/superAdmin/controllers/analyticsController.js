// Importing the AnalyticsService to handle business logic related to analytics
const AnalyticsService = require('../services/analyticsService');

class AnalyticsController {
    // Controller method to handle requests for fetching analytics data
    async getAnalytics(req, res) {
        try {
            // Extracting the time range from query parameters
            const { timeRange } = req.query;

            // Fetch analytics data based on the provided time range
            const analyticsData = await AnalyticsService.getAnalytics(timeRange);

            // Respond with the retrieved analytics data
            res.json({
                success: true, // Indicating a successful response
                data: analyticsData // Returning the fetched analytics data
            });
        } catch (error) {
            // Log the error for debugging
            console.error('Get analytics error:', error);

            // Respond with an error message if analytics data fetching fails
            res.status(500).json({
                success: false, // Indicating failure
                message: 'Failed to fetch analytics data' // Error message for the client
            });
        }
    }
}

// Exporting an instance of AnalyticsController for use in other parts of the application
module.exports = new AnalyticsController();
