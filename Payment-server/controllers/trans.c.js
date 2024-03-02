const transM = require('../models/trans.m')
const accM = require('../models/acc.m')
const HttpError = require("../models/http-error");
const { result } = require('../utils/db');

module.exports = {
    async transaction(req, res, next) {
        console.log(req.userData);
        const userId = req.userData.userId;
        const orderID = req.userData.orderID;
        const amount = req.userData.amount;
        const id = await accM.getIdByUserID(userId);
        try {

            // const { id, orderID, amount } = req.body

            const data = await transM.transaction(id, amount, orderID);

            setTimeout(() => {
                res.json({message : "The transaction is success"})
            },5000)
            // res.json({message : "The transaction is success"})
        } catch (error) {
            console.log(error);
            try {
                const res1 = await transM.saveTrans(id, orderID, amount);
            } catch (error2) {
                console.log(error2);
                return next (new HttpError("Error transaction", 500));
            }
            console.error(error);
            return next (new HttpError(error.message, 500));
        }
    },

    async getTransByPage (req, res, next){
        try {
            console.log("determin in payment")
            const page = req.query.page || 1;
            let perPage = (req.query.per_page ? parseInt(req.query.per_page) : 7);
            const userID = req.query.userID;
                
            // let accID = null;
            // if (userID) {
            //     accID = await accM.getIdByUserID(userID);
            // }
            
            const pageSize = perPage; // số dòng trên 1 trang  
            const result = await transM.getByPage(userID, page, pageSize);
            return res.json(result);
        } catch (error) {
            return next(new HttpError(error.message,500));
        }
    },
    async getTransByOrderID (req,res,next) {
        try {
            const orderid = req.userData.orderid;
            console.log(orderid);
            const rs = await transM.getTransByOrderID(orderid);
            res.status(200).json(rs);
        } catch (error) {
            next(error);
        }
    }
}