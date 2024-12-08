const express = require('express');
const router = express.Router();
const paymentController = require('./controllers/paymentController');

// Debug middleware
router.use((req, res, next) => {
    console.log('SuperAdmin API Request:', {
        method: req.method,
        url: req.url,
        body: req.method === 'POST' ? req.body : undefined
    });
    next();
});

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'SuperAdmin API is working'
    });
});

// Payment routes
router.get('/payments', async (req, res, next) => {
    try {
        await paymentController.getPayments(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/payment-stats', async (req, res, next) => {
    try {
        await paymentController.getPaymentStats(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/payments', async (req, res, next) => {
    try {
        await paymentController.addPayment(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/generate-payment-report', async (req, res, next) => {
    try {
        await paymentController.generateReport(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router; 