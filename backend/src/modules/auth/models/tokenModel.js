const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['reset', 'verification', 'refresh']
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Add index for expiration
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Token', tokenSchema); 