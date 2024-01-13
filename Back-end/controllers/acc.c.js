const accM = require("../models/acc.m");
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {
    signUpHandler: async (req, res, next) => {
        const un = req.body.username;
        const acc = await accM.getByUsername(un);

        if (acc) {
            console.log(`This username '${acc.Username}' has been existed`);
            //console.log(acc);
            res.json({message: `This username '${acc.Username}' has been existed`});
        } else {
            const {name, email, password, dob, role} = req.body;

            if (!name || !email || !password || !dob || !role) {
                res.json({message: "You have to fill out all the fields"});
            } else {

                const hashedPw = await bcrypt.hash(password, saltRound);
                const rs = await accM.add(new accM({ Name: name, Username: un, Email: email, Password: hashedPw, DOB: dob, Role: role}));
                //console.log(rs);
                req.session.auth = true;
                res.json({
                    message: "Register new account successfully",
                    account: {
                        id: rs.ID,
                        name: rs.Name,
                        username: rs.Username,
                        email: rs.Email
                    }
                });
            }

        }
    },

    logInHandler: async (req, res, next) => {
        const {username, password} = req.body;

        const acc = await accM.getByUsername(username);
        if (!acc) {
            console.log("none acc");
            return res.json({message: `The username '${username}' does not exist`});
        }

        const check = await bcrypt.compare(password, acc.Password);

        if (!check) {
            console.log("Incorrect password");
            return res.json({message: "Incorrect password"});
        }

        req.session.auth = true;
        res.json({message: "Log in successfully"});
    }
}