const dotenv = require('dotenv');
dotenv.config();
const User = require('../modules/auth/models/userModel');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const resetSuperAdmin = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@nextgen.com';
        const newPassword = 'Admin@123'; // You can change this password

        // Find super admin
        let superAdmin = await User.findOne({ 
            email: superAdminEmail,
            roles: 'superadmin'
        });

        if (!superAdmin) {
            console.log('Super Admin not found, creating new one...');
            
            // Create new super admin
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            
            superAdmin = new User({
                email: superAdminEmail,
                password: hashedPassword,
                firstName: 'Super',
                lastName: 'Admin',
                roles: ['superadmin'],
                isVerified: true
            });
        } else {
            console.log('Super Admin found, resetting password...');
            
            // Update password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            superAdmin.password = hashedPassword;
        }

        await superAdmin.save();
        console.log('Super Admin credentials:');
        console.log('Email:', superAdminEmail);
        console.log('Password:', newPassword);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

resetSuperAdmin(); 