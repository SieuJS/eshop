const accM = require('../models/acc.m')
const HttpError = require("../models/http-error")

module.exports = {
    async create(req, res, next) {
        const {shopId, balance} = req.body;
        const newAcc = new accM({
            ShopID : shopId, 
            Balance : balance
        })
        let data ;
        try {
        data = await accM.add(newAcc)}
        catch (err) {
            console.error(err);
            return next (new HttpError("Some error occur when create account", 500));
        }
        // add success
        console.log(data)
        res.json({
            message : "create success" ,
            account : newAcc })
    },

    async getAll (req, res, next) {
        res.json({message : "get"})
    },

    async getBalance(req, res, next) {
        const shopID = req.params.id;
        const balance = await accM.getBalanceByShopID(shopID);
        res.json({
            shop_id: shopID,
            balance: balance
        })
    }
}