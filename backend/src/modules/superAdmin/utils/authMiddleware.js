const jwt = require('jsonwebtoken');
const User = require('../../auth/models/userModel');

exports.isSuperAdmin = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if user is super admin
        if (!user.roles.includes('superadmin')) {
            return res.status(403).json({ message: 'Access denied. Super Admin privileges required.' });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in isSuperAdmin middleware:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
}; 