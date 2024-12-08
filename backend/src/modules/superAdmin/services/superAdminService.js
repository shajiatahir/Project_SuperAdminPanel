const Admin = require('../models/adminModel');
const { generatePassword } = require('../utils/passwordUtils');
const { sendEmail } = require('./emailService');

class SuperAdminService {
    async createAdmin(adminData) {
        try {
            // Check if admin with this email already exists
            const existingAdmin = await Admin.findOne({ email: adminData.email });
            if (existingAdmin) {
                throw new Error('An admin with this email already exists');
            }

            // Generate a temporary password
            const temporaryPassword = generatePassword();

            // Create the admin using the User model
            const admin = await Admin.create({
                name: adminData.name,
                email: adminData.email,
                password: temporaryPassword, // Will be hashed by the model's pre-save hook
                roles: ['admin'],
                createdBy: adminData.createdBy,
                isVerified: true // Auto-verify admin accounts
            });

            // Send email with credentials
            await this.sendAdminCredentials(admin.email, temporaryPassword);

            return {
                admin,
                temporaryPassword
            };
        } catch (error) {
            console.error('Create admin service error:', error);
            throw error;
        }
    }

    async getAllAdmins() {
        try {
            return await Admin.find({ 
                roles: 'admin',
                isActive: true 
            }).select('-password');
        } catch (error) {
            throw new Error(`Error fetching admins: ${error.message}`);
        }
    }

    async deleteAdmin(adminId) {
        try {
            const admin = await Admin.findById(adminId);
            if (!admin) {
                throw new Error('Admin not found');
            }

            // Soft delete - just mark as inactive
            admin.isActive = false;
            await admin.save();

            return admin;
        } catch (error) {
            throw new Error(`Error deleting admin: ${error.message}`);
        }
    }

    async sendAdminCredentials(email, password) {
        const emailData = {
            to: email,
            subject: 'Your Admin Account Credentials',
            html: `
                <h1>Welcome to NextGen Academy</h1>
                <p>Your admin account has been created. Here are your login credentials:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Temporary Password:</strong> ${password}</p>
                <p>Please change your password after your first login for security purposes.</p>
                <p>Login here: <a href="${process.env.FRONTEND_URL}/login">${process.env.FRONTEND_URL}/login</a></p>
                <p>Best regards,<br>NextGen Academy Team</p>
            `
        };

        try {
            await sendEmail(emailData);
        } catch (error) {
            console.error('Error sending admin credentials email:', error);
            // Don't throw error here - admin is created even if email fails
        }
    }
}

module.exports = new SuperAdminService(); 