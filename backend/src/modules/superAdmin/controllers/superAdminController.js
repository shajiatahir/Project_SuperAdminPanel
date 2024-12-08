const User = require('../../auth/models/userModel');

class SuperAdminController {
    async createAdmin(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            console.log('Creating new admin:', { firstName, lastName, email });

            // Create user using the User model
            const user = new User({
                firstName,
                lastName,
                email,
                password, // Will be hashed by User model's pre-save middleware
                roles: ['superadmin'],
                isVerified: true
            });

            const savedUser = await user.save();
            console.log('Admin created successfully:', savedUser._id);

            res.status(201).json({
                success: true,
                message: 'Admin created successfully',
                data: {
                    _id: savedUser._id,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email,
                    roles: savedUser.roles
                }
            });
        } catch (error) {
            console.error('Create admin error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to create admin'
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            // Get all users from the database
            const users = await User.find()
                .select('firstName lastName email roles createdAt')
                .sort({ createdAt: -1 });

            console.log(`Found ${users.length} users`);

            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch users'
            });
        }
    }
}

module.exports = new SuperAdminController(); 