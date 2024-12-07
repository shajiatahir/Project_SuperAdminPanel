const dotenv = require('dotenv');
dotenv.config();
const User = require('../modules/auth/models/userModel');
const mongoose = require('mongoose');

const createSuperAdmin = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const superAdminEmail = 'i222695@nu.edu.pk';
        const plainPassword = 'Shajia123$';

        // Check if super admin already exists
        const existingSuperAdmin = await User.findOne({ 
            email: superAdminEmail,
            roles: 'superadmin'
        });

        if (existingSuperAdmin) {
            console.log('Updating existing Super Admin password...');
            existingSuperAdmin.password = plainPassword; // Let the model's pre-save middleware handle hashing
            await existingSuperAdmin.save();
            console.log('Super Admin password updated successfully');
            await mongoose.connection.close();
            return;
        }

        // Create super admin (password will be hashed by pre-save middleware)
        const superAdmin = new User({
            email: superAdminEmail,
            password: plainPassword,
            firstName: 'Super',
            lastName: 'Admin',
            roles: ['superadmin'],
            isVerified: true
        });

        await superAdmin.save();
        console.log('Super Admin created successfully');
        console.log('Email:', superAdminEmail);
        console.log('Password:', plainPassword);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

createSuperAdmin();
