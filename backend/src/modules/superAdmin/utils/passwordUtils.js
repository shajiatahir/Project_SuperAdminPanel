const crypto = require('crypto');

exports.generatePassword = () => {
    const length = 12;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+';
    const charset = uppercase + lowercase + numbers + special;
    
    let password = '';
    
    // Ensure at least one of each required character type
    password += uppercase[crypto.randomInt(uppercase.length)];
    password += lowercase[crypto.randomInt(lowercase.length)];
    password += numbers[crypto.randomInt(numbers.length)];
    password += special[crypto.randomInt(special.length)];
    
    // Fill the rest with random characters
    while (password.length < length) {
        password += charset[crypto.randomInt(charset.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}; 