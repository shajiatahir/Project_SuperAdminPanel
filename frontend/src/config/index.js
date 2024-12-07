const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    env: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
};

export default config; 