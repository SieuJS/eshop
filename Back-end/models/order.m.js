const db = require("../utils/db");
const pgp = require("pg-promise")({capSQL: true});
const tbName = "Orders";

module.exports = class Order {
    static async insert(orderdate, userid, total,address,phone) {
        const data = {
            "OrderDate": orderdate,
            "UserID": userid,
            "Total": total,
            "Address": address,
            "Phone": phone
        }
        const query = pgp.helpers.insert(data,null,tbName) + 'RETURNING "OrderID"';
        const rs = await db.one(query);
        return rs.OrderID;
    }
}