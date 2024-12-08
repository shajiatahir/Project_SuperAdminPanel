const ContentApprovalService = require('../services/contentApprovalService');

class ContentApprovalController {
    async getPendingContent(req, res) {
        try {
            const pendingContent = await ContentApprovalService.getPendingContent();
            res.json({
                success: true,
                data: pendingContent
            });
        } catch (error) {
            console.error('Get pending content error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async approveContent(req, res) {
        try {
            const { contentId } = req.params;
            const content = await ContentApprovalService.approveContent(contentId, req.user._id);
            res.json({
                success: true,
                message: 'Content approved successfully',
                data: content
            });
        } catch (error) {
            console.error('Approve content error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async rejectContent(req, res) {
        try {
            const { contentId } = req.params;
            const { notes } = req.body;
            const content = await ContentApprovalService.rejectContent(contentId, req.user._id, notes);
            res.json({
                success: true,
                message: 'Content rejected successfully',
                data: content
            });
        } catch (error) {
            console.error('Reject content error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new ContentApprovalController(); 