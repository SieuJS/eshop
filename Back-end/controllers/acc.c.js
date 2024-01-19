const accM = require("../models/acc.m");
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {
    getUser: async (req, res, next) => {
        const userId = req.params.userId;
        const user = await accM.getByUserID(userId);
        if (!user) {
            res.json("Invalid user id");
            return;
        }
        res.json(user);
    },

    signUpHandler: async (req, res, next) => {
        const un = req.body.username;
        const acc = await accM.getByUsername(un);

        if (acc) {
            console.log(`This username '${acc.Username}' has been existed`);
            //console.log(acc);
            res.json({ message: `This username '${acc.Username}' has been existed` });
        } else {
            const { name, email, password, dob, role } = req.body;

            if (!name || !email || !password || !dob || !role) {
                res.json({ message: "You have to fill out all the fields" });
            } else {

                const hashedPw = await bcrypt.hash(password, saltRound);
                const result = await accM.add(new accM({
                    Name: name,
                    Username: un,
                    Email: email,
                    Password: hashedPw,
                    DOB: dob,
                    Role: role
                }));

                //console.log(rs);
                req.session.auth = true;
                res.json({
                    message: "Register new account successfully",
                    account: {
                        id: result.ID,
                        name: result.Name,
                        username: result.Username,
                        email: result.Email
                    }
                });
            }

        }
    },

    logInHandler: async (req, res, next) => {
        const { username, password } = req.body;

        const acc = await accM.getByUsername(username);
        if (!acc) {
            console.log("none acc");
            return res.json({ message: `The username '${username}' does not exist` });
        }

        const check = await bcrypt.compare(password, acc.Password);

        if (!check) {
            console.log("Incorrect password");
            return res.json({ message: "Incorrect password" });
        }

        req.session.auth = true;
        res.json({ message: "Log in successfully" });
    },

    updateHandler: async (req, res) => {
        const userID = req.body.ID;
        const acc = await accM.getByUserID(userID);

        if (!acc) {
            res.json({ message: "Invalid user" });
        } else {
            const newUsername = req.body.newUsername ? req.body.newUsername : null;
            const newPw = req.body.newPassword ? req.body.newPassword : null;
            const newName = req.body.newName ? req.body.newName : null;
            const newEmail = req.body.newEmail ? req.body.newEmail : null;
            const newDOB = req.body.newDOB ? req.body.newDOB : null;
            if (!newUsername && !newPw && !newName && !newEmail && !newDOB) {
                return res.json({
                    message: "You have to provide at least one new information to update"
                });
            }

            const newValues = {
                user_id: userID,
                newUsername,
                newPassword: newPw ? await bcrypt.hash(newPw, saltRound) : null,
                newName,
                newEmail,
                newDOB
            }
            //console.log(newValues);
            const result = await accM.updateUser(newValues);
            //console.log("result", result);

            if (result) {
                res.json({
                    message: "Update user succesfully",
                    user: result[0]
                })
            }else {
                res.json({
                    message: "Fail to update user"
                })
            }
        }
    },

    deleteHandler: async (req, res) => {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.json({
                isSuccess: false,
                message: "Invalid field username or password or both of them"
            })
        }

        const acc = await accM.getByUsername(username);
        if (!acc) {
            return res.json({
                isSuccess: false,
                message: "The user does not exist"
            })
        }else {
            let checkPw = false;
            checkPw = await bcrypt.compare(password, acc.Password);
            if (checkPw) {
                await accM.deleteUser(username);
                res.json({
                    isSuccess: true,
                    message: `The user '${username}' has been deleted`
                })
            } else {
                res.json({
                    isSuccess: false,
                    message: "Fail to delete the user. The password is incorrect"
                })
            }
        }
    }
}