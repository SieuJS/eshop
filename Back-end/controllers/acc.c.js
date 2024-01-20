require('dotenv').config()
const accM = require("../models/acc.m");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;
const HttpError = require("../models/http-error");
// Quy uoc loi input tu client la 420
const jwtKey = process.env.JWT_SECRET_KEY;
module.exports = {
  getUserById : async (req, res, next) => {
    const {userId} = req.params;
    let identifierUser ;
    try {
      identifierUser = accM.getByUserID(userId);
    }
    catch(err) {
      console.error(err)
      return next (new HttpError("Some error when find user") , 500)
    }
    if(!identifierUser) 
      return next(new HttpError("Can not find use with provide id: "+ userId, 404 ));
    return res.status(200).json({user : identifierUser});
  },

  checkUsername : async (req, res, next) => {
    const {username} = req.params;
    let identifierUser ;
    try {
      identifierUser= accM.getByUsername(username);
    }
    catch(err) {
      console.error(err)
      return next (new HttpError("Some error when find user") , 500)
    }
    if(!identifierUser) 
      return next(new HttpError("Can not find use with provide id: "+ userId, 404 ));
    return res.status(200).json({user : identifierUser});
  },


  signUpHandler: async (req, res, next) => {

    const un = req.body.username;
    
    const acc = await accM.getByUsername(un);
    const { name, email, password, dob, role } = req.body;

    if (acc) {
      console.log(`This username '${acc.Username}' has been existed`);
      console.log('exit')
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
      console.error(err)
      const error = new HttpError("Something wrong when signup", 500);
      return next(error);
    }
    // adding token
    
    try {
      token = jwt.sign(
        {
          userId : newUser.ID, 
          username : newUser.Username,
          role
        },
        jwtKey,
        {expiresIn : "1h"}
      );
    } catch(err) {
      console.error(err)
      const error = new HttpError (
        'Something wrong when add jwt', 500
      );
      return next(error);
    }
    res.status(201).json({
      message: "Register new account successfully",
      user: {
        id: newUser.ID,
        name: newUser.Name,
        username: newUser.Username,
        email: newUser.Email,
        token : token,
        role : newUser.Role
      },
    });
  },

  logInHandler: async (req, res, next) => {
    const { username, password } = req.body;

    let identifierUser
    try {
      identifierUser = await accM.getByUsername(username);
    }catch (err){
      console.error(err)
      return next(new HttpError("Some error occurs when find your account", 500));
    }
    if (!identifierUser) {
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
          userId : identifierUser.ID, 
          username : identifierUser.Username,
          role : identifierUser.Role
        },
        jwtKey,
        {expiresIn : "1h"}
      );
    } catch(err) {
      console.err(err)
      const error = new HttpError (
        'Something wrong when add jwt', 500
      );
      return next(error);
    }
    
    res.status(201).json({
      message: "Login success",
      user: {
        id: identifierUser.ID,
        name: identifierUser.Name,
        username: identifierUser.Username,
        email: identifierUser.Email,
        role : identifierUser.Role,
        token : token
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
};
