const jwt = require('jsonwebtoken');
const User = require('../../auth/models/userModel');

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
        const user = await User.findById(decoded.userId || decoded.id);

        if (!user || !user.roles.includes('superadmin')) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized as Super Admin'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = { authenticateSuperAdmin }; 