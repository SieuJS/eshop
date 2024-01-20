const accM = require("../models/acc.m");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;
const HttpError = require("../models/http-error");
// Quy uoc loi input tu client la 420

module.exports = {
  signUpHandler: async (req, res, next) => {
    console.log(req.body)
    const un = req.body.username;
    console.log(un)
    const acc = await accM.getByUsername(un);
    const { name, email, password, dob, role } = req.body;
    if (acc) {
      console.log(`This username '${acc.Username}' has been existed`);
      //console.log(acc);
      const error = new HttpError(
        `This username '${acc.Username}' has been existed`,
        420
      );
      return next(error);
    }

    if (!name || !email || !password || !dob || !role) {
      const error = new HttpError(`You have to fill out all the fields `, 420);
      return next(error);
    }

    let newUser;
    let token;
    try {
      const hashedPw = await bcrypt.hash(password, saltRound);

      newUser = await accM.add(
        new accM({
          Name: name,
          Username: un,
          Email: email,
          Password: hashedPw,
          DOB: dob,
          Role: role,
        })
      );

    } catch (err) {
      const error = new HttpError("Something wrong when signup", 500);
      return next(error);
    }
    // adding token
    try {
      token = jwt.sign(
        {
          userId: newUser.ID,
          username: newUser.Username
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new HttpError(
        'Something wrong when add jwt', 500
      );
      return next(error);
    }
    //console.log(rs);
    res.status(201).json({
      message: "Register new account successfully",
      user: {
        id: newUser.ID,
        name: newUser.Name,
        username: newUser.Username,
        email: newUser.Email,
        token: token
      },
    });
  },

  logInHandler: async (req, res, next) => {
    const { username, password } = req.body;

    const acc = await accM.getByUsername(username);
    if (!acc) {
      const error = new HttpError(`The username '${username}' does not exist`, 404);
      return next(error);
    }

    const check = await bcrypt.compare(password, acc.Password);

    if (!check) {
      const error = new HttpError("Incorrect password", 420);
      return next(error);
    }
    try {
      token = jwt.sign(
        {
          userId: acc.ID,
          username: acc.Username
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new HttpError(
        'Something wrong when add jwt', 500
      );
      return next(error);
    }

    res.status(201).json({
      message: "Login success",
      user: {
        id: acc.ID,
        name: acc.Name,
        username: acc.Username,
        email: acc.Email,
        token: token
      },
    });
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
          message: "You have to provide at least one new information to update",
        });
      }

      const newValues = {
        user_id: userID,
        newUsername,
        newPassword: newPw ? await bcrypt.hash(newPw, saltRound) : null,
        newName,
        newEmail,
        newDOB,
      };
      //console.log(newValues);
      const result = await accM.updateUser(newValues);
      //console.log("result", result);

      if (result) {
        res.json({
          message: "Update user succesfully",
          user: result[0],
        });
      } else {
        res.json({
          message: "Fail to update user",
        });
      }
    }
  },

  deleteHandler: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        isSuccess: false,
        message: "Invalid field username or password or both of them",
      });
    }

    const acc = await accM.getByUsername(username);
    if (!acc) {
      return res.json({
        isSuccess: false,
        message: "The user does not exist",
      });
    } else {
      let checkPw = false;
      checkPw = await bcrypt.compare(password, acc.Password);
      if (checkPw) {
        await accM.deleteUser(username);
        res.json({
          isSuccess: true,
          message: `The user '${username}' has been deleted`,
        });
      } else {
        res.json({
          isSuccess: false,
          message: "Fail to delete the user. The password is incorrect",
        });
      }
    }
  },
  checkUsername: async (req, res, next) => {
    const username = req.params.username;
    const user = await accM.getByUsername(username);
    if (!user) {
      res.json({ valid: false });
    } else {
      res.json({
        valid: true,
        user: {
          id: user.ID,
          username: user.Username,
          email: user.Email
        }
      })
    }
  },
  getUserById: async (req, res, next) => {
    const userId = req.params.userId;
    const user = await accM.getByUserID(userId);
    if (!user) {
      next( new HttpError("Invalid user id. Cannot get by id"));
      return;
    }else {
      res.json(user)
    }
  }
};
