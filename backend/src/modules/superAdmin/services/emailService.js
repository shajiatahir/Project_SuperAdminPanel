const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.sendAdminCredentials = async (email, password, firstName) => {
    try {
        const mailOptions = {
            from: `"NextGen Academy" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your Admin Account Credentials',
            html: `
                <h1>Welcome to NextGen Academy!</h1>
                <p>Dear ${firstName},</p>
                <p>Your admin account has been created successfully. Here are your login credentials:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p>For security reasons, please change your password after your first login.</p>
                <p>Best regards,<br>NextGen Academy Team</p>
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send admin credentials email');
    }
}; 