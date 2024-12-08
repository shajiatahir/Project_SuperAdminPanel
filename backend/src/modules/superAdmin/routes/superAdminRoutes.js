const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const contentApprovalController = require('../controllers/contentApprovalController');
const analyticsController = require('../controllers/analyticsController');
const paymentController = require('../controllers/paymentController');
const { authenticateSuperAdmin } = require('../middleware/authMiddleware');

// Debug log to verify routes are loaded
console.log('Loading super admin routes...');

// Apply superadmin authentication middleware to all routes
router.use(authenticateSuperAdmin);

// Debug middleware to log all requests
router.use((req, res, next) => {
    console.log(`Super Admin API Request: ${req.method} ${req.url}`);
    next();
});

// Super Admin management routes
router.post('/users', (req, res, next) => {
    console.log('Create user request received');
    next();
}, superAdminController.createAdmin);

router.get('/users', (req, res, next) => {
    console.log('Get users request received');
    next();
}, superAdminController.getAllUsers);

router.put('/users/:id', superAdminController.updateUser);
router.delete('/users/:id', superAdminController.deleteUser);

// Content approval routes
router.get('/content-approvals', contentApprovalController.getPendingContent);
router.post('/content-approvals/:contentId/approve', contentApprovalController.approveContent);
router.post('/content-approvals/:contentId/reject', contentApprovalController.rejectContent);

// Analytics routes
router.get('/analytics', analyticsController.getAnalytics);

// Payment management routes
router.get('/payments', (req, res, next) => {
    console.log('Get payments request received:', req.query);
    next();
}, paymentController.getPayments);

router.get('/payment-stats', (req, res, next) => {
    console.log('Get payment stats request received');
    next();
}, paymentController.getPaymentStats);

router.get('/generate-payment-report', (req, res, next) => {
    console.log('Generate payment report request received');
    next();
}, paymentController.generateReport);

// Other payment-related routes
router.get('/financial-report', paymentController.getPayments); // For backward compatibility
router.get('/payments/stats', paymentController.getPaymentStats); // Alternative endpoint
router.get('/payments/report', paymentController.generateReport); // Alternative endpoint

router.post('/payments', paymentController.addPayment);

console.log('Super admin routes loaded successfully');

module.exports = router; 