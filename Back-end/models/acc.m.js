const db = require("../utils/db");

module.exports = class Account {
    constructor({Name, Username, Email, Password, DOB, Role}) {
        this.Name = Name;
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
        this.DOB = DOB;
        this.Role = Role
    }

    static async getByUsername(un) {
        const rs = await db.get("Users", "Username", un);
        return rs;
    }

    static async add(acc) {
        const data = await db.insert("Users", acc, "*");
        return data;
    }
}