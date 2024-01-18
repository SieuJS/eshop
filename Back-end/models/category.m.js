const db = require("../utils/db");
const pgp = require("pg-promise")({capSQL: true});

const tbName = "Categories";
module.exports = class Category{
    constructor({CatID, CatName}) {
        this.CatID = CatID;
        this.CatName = CatName;
    }

    static async getAll() {
        try {
            const data = await db.any(`SELECT * FROM "${tbName}"`);
            return data;
        } catch (error) {
            throw error
        }
    }

    static async add(entity) {
        try {
            const query = pgp.helpers.insert(entity, null, tbName);
            const data = await db.one(query + `RETURNING "CatID"`);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async getMaxID() {
        try {
            const data = await db.one(`SELECT MAX("CatID") FROM "${tbName}"`);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteByID(id) {
        try {
            const data = await db.oneOrNone(`DELETE FROM "${tbName}" WHERE "CatID" = ${id}`);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async updateByID(entity, id) {
        try {
            // const condition = pgp.as.format(` where "CatID" = ${id}`, entity);
            const query = pgp.helpers.update(entity, null, tbName) + ` where "CatID" = ${id}`; 
            const data = await db.oneOrNone(query);
            return data;
        } catch (err) {
            throw err;
        }
    }
}