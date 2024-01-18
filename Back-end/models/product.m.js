const db = require("../utils/db");
const pgp = require("pg-promise")({capSQL: true});

const tbName = "Products";
module.exports = class Product{
    static async getByCat(catID) {
        try {
            const data = await db.any(`SELECT * FROM "${tbName}" tb1 JOIN "Categories" tb2 ON tb1."CatID" = tb2."CatID" WHERE tb2."CatID" = ${catID}`, [catID]);
            return data;
        } catch (error) {
            throw error
        }
    }

    static async getMaxID() {
        try {
            const data = await db.one(`SELECT MAX("ProID") FROM "${tbName}"`);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async add(entity) {
        try {
            const query = pgp.helpers.insert(entity, null, tbName);
            const data = await db.one(query + `RETURNING "ProID"`);
            return data;
        } catch (err) {
            throw err;
        }
    }
    static async getById(_id) {
        const rs = await db.query(`SELECT * FROM "Products" WHERE "ProID" = ${_id}`);
        return rs;
    }

    // static async getMaxID() {
    //     try {
    //         const data = await db.one(`SELECT MAX("CatID") FROM "${tbName}"`);
    //         return data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // static async deleteByID(id) {
    //     try {
    //         const data = await db.oneOrNone(`DELETE FROM "${tbName}" WHERE "CatID" = ${id}`);
    //         return data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // static async updateByID(entity, id) {
    //     try {
    //         // const condition = pgp.as.format(` where "CatID" = ${id}`, entity);
    //         const query = pgp.helpers.update(entity, null, tbName) + ` where "CatID" = ${id}`; 
    //         const data = await db.oneOrNone(query);
    //         return data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }
}