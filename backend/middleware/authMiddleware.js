// Middleware for requiring sign-in
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../modles/userModel');
dotenv.config();

const requireSignIn = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Please login first' });
        }

        // Verify JWT token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);


        // Attach user information to request body
        req.body.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in requireSignIn middleware:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = { requireSignIn };
