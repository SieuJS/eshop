const productM = require('../models/product.m')

module.exports = {
    getById: async (req,res,next) => {
        const id = req.params.proid;
        const rs = await productM.getById(id);
        rs[0].Price = parseInt(rs[0].Price,10);
        res.json(rs);
    }
}