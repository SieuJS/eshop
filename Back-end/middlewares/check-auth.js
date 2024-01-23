const HttpError = require('../models/http-error')

const jwt = require('jsonwebtoken')

module.exports = (req, res, next ) => {

    if(req.method === "OPTIONS"){
        return next();
    }

    try {
        const authHeaders = req.headers.authorization// authorization : "Bear Token" 
        if(!authHeaders) {
            const error = new Error('Authentication failed');
            throw error;
        }
        const token = authHeaders.split(' ')[1];
        if(!token) {
            const error = new Error('Authentication failed');
            throw error;
        }
        const decodedToken = jwt.verify(token , "supersecret_dont_share");
        req.userData  =  {
            userId : decodedToken.userId,
        }  
        // req.useId = decodedToken.userId;
        console.log("userid in middleware: ", decodedToken.userId);
        next();

    }catch (err) {
        return next (new HttpError(err.message, 402));
    }
};