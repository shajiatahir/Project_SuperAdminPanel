const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const { authenticateSuperAdmin } = require('../middleware/authMiddleware');
const paymentController = require('../controllers/paymentController');

// Apply superadmin authentication middleware to all routes
router.use(authenticateSuperAdmin);

// Admin management routes
router.post('/admins', superAdminController.createAdmin);
router.get('/admins', superAdminController.getAllAdmins);
router.delete('/admins/:id', superAdminController.deleteAdmin);

// Payment and subscription routes
router.get('/financial-report', paymentController.getFinancialReport);
router.get('/payments', paymentController.getPaymentsByDate);
router.post('/promotions', paymentController.createPromotion);

module.exports = router; 