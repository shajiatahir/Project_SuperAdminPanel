const mongoose = require('mongoose');
const Payment = require('./paymentModel');
require('dotenv').config();

// Connect to MongoDB using the same connection string as main app
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NextGenAcademy')
    .then(() => console.log('MongoDB connected on port 8080'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create multiple sample payments
const createSamplePayments = async () => {
    try {
        const samplePayments = [
            {
                userId: new mongoose.Types.ObjectId(),
                subscriptionId: new mongoose.Types.ObjectId(),
                amount: 299.99,
                currency: 'USD',
                status: 'completed',
                paymentMethod: 'stripe',
                transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            },
            {
                userId: new mongoose.Types.ObjectId(),
                subscriptionId: new mongoose.Types.ObjectId(),
                amount: 199.99,
                currency: 'USD',
                status: 'pending',
                paymentMethod: 'paypal',
                transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        ];

        const savedPayments = await Payment.insertMany(samplePayments);
        console.log('Sample payments created:', savedPayments);
    } catch (error) {
        console.error('Error creating sample payments:', error);
    } finally {
        mongoose.connection.close();
    }
};

createSamplePayments();
