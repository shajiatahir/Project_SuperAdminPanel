const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const User = require('../modules/auth/models/userModel');

const updateSuperAdminPassword = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const email = 'i222695@nu.edu.pk';
        const newPassword = 'Shajia123$';

        // First, delete any existing user with this email
        await User.deleteOne({ email });
        console.log('Cleaned up any existing user');

        // Create a new super admin user using the Mongoose model
        const superAdmin = new User({
            email,
            password: newPassword, // The password will be hashed by the pre-save middleware
            firstName: 'Super',
            lastName: 'Admin',
            roles: ['superadmin'],
            isVerified: true
        });

        await superAdmin.save();
        console.log('Super admin created successfully');

        // Verify the creation
        const createdUser = await User.findOne({ email }).select('+password');
        if (createdUser) {
            console.log('Super Admin created with following details:');
            console.log('Email:', email);
            console.log('Password:', newPassword);
            console.log('Roles:', createdUser.roles);
            console.log('IsVerified:', createdUser.isVerified);
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

updateSuperAdminPassword(); 