const jwt = require('jsonwebtoken');

// Hardcoded JWT_SECRET as a workaround for the .env file issue
const JWT_SECRET = 'your-jwt-secret';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
