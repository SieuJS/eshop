const db = require("../utils/db");

module.exports = {
    async getProductbySearch(name,catID) {
        const rs = await db.getProductbySearch(name,catID);
        return rs;
    }
}