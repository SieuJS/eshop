const HttpError = require('../models/http-error')

const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_SECRET_KEY;

module.exports = (req,res,next) => {
    try {
        const role = req.role;
        if (!role) {
            const error = new Error('Authorization failed');
            throw error;
        }
        if (role != 'admin') {
            const error = new Error('Authorization failed');
            throw error;
        }
        next();
    }
    catch (e) {
        return next (new HttpError(err.message, 402));
    }
}