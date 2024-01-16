const db = require("../utils/db");

module.exports = {
    async getProductbySearch(name, catid, min, max, page, productsPerPage) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        var queryString = `SELECT * FROM "Products" WHERE "ProName" ILIKE '%${name}%'`;
        if (catid != null) {
            queryString += ` AND "CatID" = ${catid}`
        }
        if (min != null && max != null) {
            queryString += ` AND "Price" BETWEEN ${min} AND ${max}`
        }
        queryString += ` OFFSET ${startIndex} LIMIT ${productsPerPage}`
        console.log(queryString);
        const data = db.query(queryString);
        return data;
    }
}