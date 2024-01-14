const searchM = require("../models/search.m");

module.exports = {
    search: async (req,res,next) => {
        const catID = req.query.category;
        const name = req.query.keyword;
        const products = await searchM.getProductbySearch(name,catID);
        console.log(products);
    }
}