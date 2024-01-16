const db = require('../utils/db')

module.exports = class Product {
    static async getById(_id) {
        const rs = await db.query(`SELECT * FROM "Products" WHERE "ProID" = ${_id}`);
        return rs;
    }
}