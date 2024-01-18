const searchM = require("../models/search.m");

module.exports = {
    search: async (req, res, next) => {
        const catid = req.query.catid;
        let name = req.query.keyword || "";
        let max = req.query.max? parseInt(req.query.max) : null;
        let min = req.query.min? parseInt(req.query.min): null;
        console.log(min);
        let page = req.query.page || 1;
        const productsPerPage = 9;  //Mặc định mỗi trang 9 sản phẩm. Có thể đổi nếu muốn

        const products = await searchM.getProductbySearch(name, catid, min, max, page, productsPerPage);
        const productsWithIntPrice = products.map(product => ({
            ...product,
            Price: parseInt(product.Price, 10)
        }));
        res.json(productsWithIntPrice);
    }
}