const orderM = require('../models/order.m')
const orderDetailM = require('../models/orderDetail.m')
const jwt = require('jsonwebtoken')
const { result } = require('../utils/db')
const jwtSecondKey = process.env.JWT_SECOND
const HttpError = require("../models/http-error");

module.exports = {
    getTransactions: async (req, res, next) => {
        const page = parseInt(req.query.page);
        const per_page = parseInt(req.query.per_page);
        const userId = req.userData.userId;
        try {
            token = jwt.sign(
                {
                    userId: userId,
                },
                jwtSecondKey,
                { expiresIn: "1h" }
            );

            const response = await fetch(
                `http://localhost:5001/api/trans/get-by-page?userID=${userId}&page=${page}&per_page=${per_page}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            if (response.ok) {
                const data = await response.json();
                res.json(data);
            }else {
                res.json({
                    data: [],
                    totalPage: 0,
                    total: 0
                })
            }
        } catch (err) {
            console.error(err)
            const error = new HttpError(
                'Something wrong when add jwt in transaction controller', 500
            );
            return next(error);
        }
    }
}