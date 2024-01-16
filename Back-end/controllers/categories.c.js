const categoriesM = require('../models/categories.m')

module.exports = {
    getAll: async (req,res,next) => {
        try {
            const rs = await categoriesM.getAll();
            res.json(rs);
        }
        catch(e) {
            console.log(e.message);
        }
    }
}