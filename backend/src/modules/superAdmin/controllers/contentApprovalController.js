// Importing the ContentApprovalService to handle the business logic related to content approvals
const ContentApprovalService = require('../services/contentApprovalService');

class ContentApprovalController {
    // Method to fetch content that is pending approval
    async getPendingContent(req, res) {
        try {
            // Retrieve the list of pending content from the service
            const pendingContent = await ContentApprovalService.getPendingContent();

            // Respond with the retrieved pending content
            res.json({
                success: true, // Indicating a successful response
                data: pendingContent // Returning the list of pending content
            });
        } catch (error) {
            // Log any error that occurs
            console.error('Get pending content error:', error);

            // Respond with an error message if fetching pending content fails
            res.status(500).json({
                success: false, // Indicating failure
                message: error.message // Error message for the client
            });
        }
    }

    // Method to approve specific content
    async approveContent(req, res) {
        try {
            // Extract the content ID from the route parameters
            const { contentId } = req.params;

            // Approve the content using the service and the user ID of the approver
            const content = await ContentApprovalService.approveContent(contentId, req.user._id);

            // Respond with a success message and the approved content
            res.json({
                success: true, // Indicating a successful response
                message: 'Content approved successfully', // Success message for the client
                data: content // Returning the approved content data
            });
        } catch (error) {
            // Log any error that occurs
            console.error('Approve content error:', error);

            // Respond with an error message if approving content fails
            res.status(500).json({
                success: false, // Indicating failure
                message: error.message // Error message for the client
            });
        }
    }

    // Method to reject specific content
    async rejectContent(req, res) {
        try {
            // Extract the content ID from the route parameters
            const { contentId } = req.params;

            // Extract rejection notes from the request body
            const { notes } = req.body;

            // Reject the content using the service, passing the user ID and rejection notes
            const content = await ContentApprovalService.rejectContent(contentId, req.user._id, notes);

            // Respond with a success message and the rejected content
            res.json({
                success: true, // Indicating a successful response
                message: 'Content rejected successfully', // Success message for the client
                data: content // Returning the rejected content data
            });
        } catch (error) {
            // Log any error that occurs
            console.error('Reject content error:', error);

            // Respond with an error message if rejecting content fails
            res.status(500).json({
                success: false, // Indicating failure
                message: error.message // Error message for the client
            });
        }
    }
}

// Exporting an instance of ContentApprovalController for use in other parts of the application
module.exports = new ContentApprovalController();
