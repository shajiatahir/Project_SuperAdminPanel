const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/superAdminModel');

const authenticateSuperAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const superAdmin = await SuperAdmin.findById(decoded.id);

        if (!superAdmin || superAdmin.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized as Super Admin'
            });
        }

        req.user = superAdmin;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid authentication token'
        });
    }
};

module.exports = {
    authenticateSuperAdmin
}; 