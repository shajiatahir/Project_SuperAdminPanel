const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    env: process.env.NODE_ENV || 'development'
};

console.log('App config:', config);

export default config; 