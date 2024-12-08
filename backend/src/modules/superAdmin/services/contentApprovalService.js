const ContentApproval = require('../models/contentApprovalModel');
const Course = require('../../courses/models/courseModel');
const Video = require('../../videos/models/videoModel');

class ContentApprovalService {
    async getPendingContent() {
        try {
            const pendingContent = await ContentApproval.find({ status: 'pending' })
                .populate('instructor', 'name email')
                .populate('contentId')
                .sort('-submittedAt');
            return pendingContent;
        } catch (error) {
            throw new Error('Error fetching pending content');
        }
    }

    async approveContent(contentId, superAdminId) {
        try {
            const content = await ContentApproval.findById(contentId);
            if (!content) {
                throw new Error('Content not found');
            }

            // Update content status
            content.status = 'approved';
            content.reviewedAt = new Date();
            content.reviewedBy = superAdminId;
            await content.save();

            // Update the actual content (course or video)
            const Model = content.contentType === 'course' ? Course : Video;
            await Model.findByIdAndUpdate(content.contentId, { isPublished: true });

            return content;
        } catch (error) {
            throw new Error(`Error approving content: ${error.message}`);
        }
    }

    async rejectContent(contentId, superAdminId, notes) {
        try {
            const content = await ContentApproval.findById(contentId);
            if (!content) {
                throw new Error('Content not found');
            }

            content.status = 'rejected';
            content.reviewedAt = new Date();
            content.reviewedBy = superAdminId;
            content.reviewNotes = notes;
            await content.save();

            return content;
        } catch (error) {
            throw new Error(`Error rejecting content: ${error.message}`);
        }
    }

    async getContentStats() {
        try {
            const stats = await ContentApproval.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);
            return stats;
        } catch (error) {
            throw new Error('Error fetching content stats');
        }
    }
}

module.exports = new ContentApprovalService(); 