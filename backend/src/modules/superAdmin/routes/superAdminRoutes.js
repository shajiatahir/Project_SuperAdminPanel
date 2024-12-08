const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const paymentController = require('../controllers/paymentController');
const { authenticateSuperAdmin } = require('../middleware/authMiddleware');

// Debug middleware
router.use((req, res, next) => {
    console.log(`Super Admin API Request: ${req.method} ${req.url}`);
    next();
});

// Payment routes
router.get('/payments', paymentController.getPayments);
router.get('/payment-stats', paymentController.getPaymentStats);
router.post('/payments', paymentController.addPayment);
router.get('/generate-payment-report', paymentController.generateReport);

// Add this route temporarily to test
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Super admin routes are working'
    });
});

// Other routes...
module.exports = router; 