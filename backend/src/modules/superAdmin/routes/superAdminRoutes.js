const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const { isSuperAdmin } = require('../utils/authMiddleware');

// Protect all routes with super admin middleware
router.use(isSuperAdmin);

// Admin management routes
router.post('/create-admin', superAdminController.createAdmin);
router.get('/admins', superAdminController.getAllAdmins);
router.delete('/admin/:id', superAdminController.deleteAdmin);

module.exports = router; 