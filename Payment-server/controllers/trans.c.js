const transM = require('../models/trans.m')
const HttpError = require("../models/http-error")

module.exports = {
    async transaction(req, res, next) {
        const { id, amount } = req.body
        try {
            const data = await transM.transaction(id, amount);
            const res1 = await transM.saveTrans(id, 1, amount, 1);

            res.json({message : "The transaction is success"})
        } catch (error) {
            try {
                const res2 = await transM.saveTrans(id, 1, amount, 0);
            } catch (error2) {
                console.log(error2);
                return next (new HttpError("Error transaction", 500));
            }
            console.error(error);
            return next (new HttpError("Error transaction", 500));
        }
    }
}