const db = require("../utils/db");
const pgp = require("pg-promise")({capSQL: true});

module.exports = class AccountGoogle {
    constructor({Sub, Name, Email, DOB, Role}) {
        this.Sub = Sub;
        this.Name = Name;
        this.Email = Email;
        this.DOB = DOB;
        this.Role = Role
    }

    static async getBySub(sub) {
        try {
            const data = await db.oneOrNone(`SELECT * FROM "UsersGoogle" WHERE "Sub" = $1`, [sub]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async add(acc) {
        try {
            const query = pgp.helpers.insert(acc, null, "UsersGoogle");
            const data = await db.one(query + "RETURNING *");
            return data;
        } catch (err) {
            throw err;
        }
    }

    /* static async updateUser(newValues) {
        // update_user is a custome function of Postgresql database
        const data = await db.func("update_user", newValues);
        return data;
    }

    static async deleteUser(username) {
        try {
            // update_user is a custome procedure of Postgresql database
            await db.proc("proc_delete_user", [username])
        } catch (error) {
            throw error;
        }
    } */
}