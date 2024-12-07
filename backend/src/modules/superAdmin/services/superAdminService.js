const Admin = require('../models/adminModel');
const { sendEmail } = require('./emailService');
const { generatePassword } = require('../utils/passwordUtils');

class SuperAdminService {
    async createAdmin(adminData, superAdminId) {
        try {
            const temporaryPassword = generatePassword();
            
            const admin = await Admin.create({
                ...adminData,
                password: temporaryPassword,
                createdBy: superAdminId
            });

            await this.sendAdminCredentials(admin.email, temporaryPassword);
            
            return admin;
        } catch (error) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
    }

    async getAllAdmins() {
        try {
            return await Admin.find({ isActive: true }).select('-password');
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
                <p>Email: ${email}</p>
                <p>Temporary Password: ${password}</p>
                <p>Please change your password after your first login.</p>
            `
        };
        
        await sendEmail(emailData);
    }
}

module.exports = new SuperAdminService(); 