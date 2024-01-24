const transM = require('../models/trans.m')
const accM = require('../models/acc.m')
const HttpError = require("../models/http-error")

module.exports = {
    async transaction(req, res, next) {
        try {
            console.log(req.userData);
            const userId = req.userData.userId;
            const orderID = null;
            const amount = req.userData.amount;

            const id = await accM.getIdByUserID(userId);
            // const { id, orderID, amount } = req.body
            const curSendBalance = await transM.getBalanceByID(id);
            const curReceiveBalance = await transM.getBalanceByID(1);
            const curSendBalanceVal = parseFloat(curSendBalance.Balance);
            const curReceiveBalanceVal = parseFloat(curReceiveBalance.Balance);

            if (curSendBalanceVal >= amount) {
                const res = await transM.transaction(id, amount);
            } else {
                const res1 = await transM.saveTrans(id, orderID, amount, 0);
                return next (new HttpError("The balance is not enough to make the transaction", 500));
            }

            const newSendBalance = await transM.getBalanceByID(id);
            const newReceiveBalance = await transM.getBalanceByID(1);
            const newSendBalanceVal = parseFloat(newSendBalance.Balance);
            const newReceiveBalanceVal = parseFloat(newReceiveBalance.Balance);

            if (newSendBalanceVal === curSendBalanceVal - amount &&
                newReceiveBalanceVal === curReceiveBalanceVal + amount) {
                const res2 = await transM.saveTrans(id, orderID, amount, 1);
            } else {
                const res3 = await transM.updateBalanceByID(id, curSendBalanceVal);
                const res4 = await transM.updateBalanceByID(1, curReceiveBalanceVal);
                return next (new HttpError("The transaction is failed", 500));
            }
            
            res.json({message : "The transaction is success"})
        } catch (error) {
            console.error(error);
            return next (new HttpError("Error transaction", 500));
        }
    }
}