const User = require('../../auth/models/userModel');
const { sendAdminCredentials } = require('../services/emailService');
const { generatePassword } = require('../utils/passwordUtils');
const { validateAdminData } = require('../utils/validationUtils');
const bcrypt = require('bcryptjs');

// Create a new admin
exports.createAdmin = async (req, res) => {
    try {
        // Validate input data
        const { error } = validateAdminData(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, firstName, lastName } = req.body;

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Generate random password
        const plainPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create new admin user
        const newAdmin = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            roles: ['admin'],
            isVerified: true
        });

        await newAdmin.save();

        // Send credentials via email
        await sendAdminCredentials(email, plainPassword, firstName);

        res.status(201).json({
            message: 'Admin created successfully',
            admin: {
                id: newAdmin._id,
                email: newAdmin.email,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName
            }
        });
    } catch (error) {
        console.error('Error in createAdmin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ roles: 'admin' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({ admins });
    } catch (error) {
        console.error('Error in getAllAdmins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await User.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.roles.includes('admin')) {
            return res.status(400).json({ message: 'User is not an admin' });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error in deleteAdmin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 