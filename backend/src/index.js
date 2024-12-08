const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// Connect to MongoDB before starting server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NextGenAcademy')
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Start server after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log('API endpoints:');
            console.log(`- GET  /api/super-admin/payments`);
            console.log(`- GET  /api/super-admin/payment-stats`);
            console.log(`- POST /api/super-admin/payments`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }); 