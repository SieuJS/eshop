const transM = require('../models/trans.m')
const accM = require('../models/acc.m')
const HttpError = require("../models/http-error")

module.exports = {
    async transaction(req, res, next) {
        console.log(req.userData);
        const userId = req.userData.userId;
        const orderID = null;
        const amount = req.userData.amount;
        const id = await accM.getIdByUserID(userId);
        try {

            // const { id, orderID, amount } = req.body

            const data = await transM.transaction(id, amount);

            res.json({message : "The transaction is success"})
        } catch (error) {
            try {
                const res1 = await transM.saveTrans(id, 1, amount);
            } catch (error2) {
                console.log(error2);
                return next (new HttpError("Error transaction", 500));
            }
            console.error(error);
            return next (new HttpError("Error transaction", 500));
        }
    },

    async getTransByPage (req, res, next){
        try {
            const page = req.query.page || 1;
            const userID = parseInt(req.query.userID);
            let accID = null;
            if (userID) {
                accID = await accM.getIdByUserID(userID);
            }
            const pageSize = 7; // số dòng trên 1 trang  
            const result = await transM.getByPage(accID, page, pageSize);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
}