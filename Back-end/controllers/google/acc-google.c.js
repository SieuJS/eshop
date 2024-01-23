const accGoogleModel = require("../../models/acc-google.m");
const HttpError = require("../../models/http-error");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_KEY;

module.exports = {
    getUserBySub: async (req, res, next) => {
        const sub = req.params.sub;
        console.log("sub in acc Google controller ", sub);
        let identifierUser;
        try {
            identifierUser = accGoogleModel.getBySub(sub);
        }
        catch (err) {
            console.error(err)
            return next(new HttpError("Some error when find user google by sub"), 500)
        }
        if (!identifierUser)
            return next(new HttpError("Can not find use with provide sub: " + sub, 404));
        return res.status(200).json({ user: identifierUser });
    },

    loginWithGoogle: async (req, res, next) => {
        const sub = req.params.sub;
        console.log("sub in acc Google controller login wG function", sub);
        let identifierUser;
        try {
            identifierUser = await accGoogleModel.getBySub(sub);
        }
        catch (err) {
            console.error(err)
            return next(new HttpError("Some error when find user google by sub"), 500)
        }

        if (!identifierUser)
            return res.status(200).json({ existed: false })
        try {
            token = jwt.sign(
                {
                    userId: identifierUser.Sub,
                    username: identifierUser.Name,
                    role: identifierUser.Role
                },
                jwtKey,
                { expiresIn: "1h" }
            );
        } catch (err) {
            const error = new HttpError(
                'Something wrong when add jwt', 500
            );
            return next(error);
        }

        res.status(201).json({
            existed: true,
            message: "Login success",
            user: {
                id: identifierUser.Sub,
                name: identifierUser.Name,
                email: identifierUser.Email,
                role: identifierUser.Role,
                token: token
            },
        });
    }
    ,

    register: async (req, res, next) => {
        const sub = req.body.sub;
        console.log("sub in register func, accG controller", sub);
        const acc = await accGoogleModel.getBySub(sub);
        const { name, email, dob, role } = req.body;

        if (acc) {
            console.log(`This user login with Google sub:'${sub}' has been existed`);
            console.log('exit')
            const error = new HttpError(
                `This user login with Google sub:'${sub}' has been existed`,
                450
            );
            return next(error);
        }

        if (!name || !email || !dob || !role) {
            const error = new HttpError(`You have to fill out all the fields `, 450);
            return next(error);
        }

        let newUser;
        let token;
        try {
            newUser = await accGoogleModel.add(
                new accGoogleModel({
                    Sub: sub,
                    Name: name,
                    Email: email,
                    DOB: dob,
                    Role: role,
                })
            );
        } catch (err) {
            console.error(err)
            const error = new HttpError("Something wrong when register new user with Google", 500);
            return next(error);
        }
        // adding token

        try {
            token = jwt.sign(
                {
                    userId: newUser.Sub,
                    name: newUser.Name,
                    role
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
        } catch (err) {
            console.error(err)
            const error = new HttpError(
                'Something wrong when add jwt', 500
            );
            return next(error);
        }
        res.status(201).json({
            message: "Register new account with Google successfully",
            user: {
                id: newUser.Sub,
                name: newUser.Name,
                email: newUser.Email,
                token: token,
                role: newUser.Role
            },
        });
    },
}