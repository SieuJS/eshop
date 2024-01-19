const accM = require("../models/acc.m");
const bcrypt = require("bcrypt");
const HttpError = require("../models/http-error");
const saltRound = 10;

module.exports = {
    getUserById: async (req, res, next) => {
        const userId = req.params.userId;
        const user = await accM.getByUserID(userId);
        if (!user) {
            next(new HttpError("Invalid user"));
            return;
        }
        res.json(user);
    },
    checkUsername: async (req, res, next) => {
        const username = req.params.username;
        const acc = await accM.getByUsername(username);
        console.log
        if (!acc) {
            res.json({
                valid: true
            })
        }else {
            res.json({
                valid: false
            })
        }
    },
    signUpHandler: async (req, res, next) => {
        const un = req.body.username;
        const acc = await accM.getByUsername(un);

        if (acc) {
            //console.log(`This username '${acc.Username}' has been existed`);
            next(new HttpError(`This username '${acc.Username}' has been existed`));
        } else {
            const { name, email, password, dob, role } = req.body;

            if (!name || !email || !password || !dob || !role) {
                next(new HttpError("You have to fill out all the fields"));
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
                //req.session.auth = true;
                res.json({
                    message: "Register new account successfully",
                    account: {
                        userId: result.ID,
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
            next(new HttpError(`The username '${username}' does not exist`));
            return;
        }

        const check = await bcrypt.compare(password, acc.Password);

        if (!check) {
            next(new HttpError("Incorrect password"));
            return;
        }

        //req.session.auth = true;
        res.json({ message: "Log in successfully", userId: acc.ID });
    },

    updateHandler: async (req, res) => {
        const userID = req.body.ID;
        const acc = await accM.getByUserID(userID);

        if (!acc) {
            next(new HttpError("Invalid user id"));
            return;
        } else {
            const newUsername = req.body.newUsername ? req.body.newUsername : null;
            const newPw = req.body.newPassword ? req.body.newPassword : null;
            const newName = req.body.newName ? req.body.newName : null;
            const newEmail = req.body.newEmail ? req.body.newEmail : null;
            const newDOB = req.body.newDOB ? req.body.newDOB : null;
            if (!newUsername && !newPw && !newName && !newEmail && !newDOB) {
                next (new HttpError("You have to provide at least one new information to update"));
                return;
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
                next(new HttpError("Fail to update"));
            }
        }
    },

    deleteHandler: async (req, res) => {
        const {username, password} = req.body;
        if (!username || !password) {
            next(new HttpError("Invalid field username or password or both of them"));
            return;
        }

        const acc = await accM.getByUsername(username);
        if (!acc) {
            next (new HttpError("The user does not exist"));
            return;
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
                next (new HttpError("Fail to delete the user. The password is incorrect"));
            }
        }
    }
}