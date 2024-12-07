const SuperAdminService = require('../services/superAdminService');
const { validateAdminCreation } = require('../utils/validationUtils');

class SuperAdminController {
    async createAdmin(req, res) {
        try {
            const { error } = validateAdminCreation(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const admin = await SuperAdminService.createAdmin(req.body, req.user.id);
            
            res.status(201).json({
                success: true,
                message: 'Admin created successfully',
                data: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllAdmins(req, res) {
        try {
            const admins = await SuperAdminService.getAllAdmins();
            res.status(200).json({
                success: true,
                data: admins
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteAdmin(req, res) {
        try {
            await SuperAdminService.deleteAdmin(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Admin deactivated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new SuperAdminController(); 