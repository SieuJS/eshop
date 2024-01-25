const db = require("../utils/db");
const pgp = require("pg-promise")({capSQL: true});

module.exports = class Trans {
    static async getBalanceByID(id) {
        try {
            const data = await db.oneOrNone(`SELECT "Balance" FROM "Account" WHERE "AccID" = $1`, [id]);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async updateBalanceByID(id, balance) {
        try {
            const data = await db.oneOrNone(`UPDATE "Account" SET "Balance" = $1 WHERE "AccID" = $2`, [balance, id]);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async transaction(id, amount) {
        try {
            const data = await db.proc("proc_transaction", [id, 1, amount]);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async saveTrans(id, orderID, amount) {
        try {
            const data = await db.proc("proc_save_trans", [id,1,orderID,amount])
            return data;
        } catch (err) {
            throw err;
        }
    }
}