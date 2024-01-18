const db = require('../utils/db')

module.exports = class Categories {
    static async getAll() {
        const rs = await db.query(`SELECT * FROM "Categories"`)
        return rs;
    }
}