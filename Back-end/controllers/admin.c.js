const AccM = require('../models/acc.m')
const HttpError = require('../models/http-error')
const bcrypt = require('bcrypt')
const saltRound = 10;
const changePassword = async (req, res, next ) => {
    const {newPassword, oldPassword} = req.body
    let AdminId = req.userData.userId ;
    let idetifierAdmin ;
    try {
        idetifierAdmin = await AccM.getByUserID(AdminId)
    }
    catch (err) {
        console.log(err)
        console.error(err);
        return next (new HttpError("Some error occurs", 500));
    }
    if(!idetifierAdmin)
    {
        return next (new HttpError("Not exists Admin", 404));
    }
    let match;
    if(idetifierAdmin.Password){
        match = await bcrypt.compare(oldPassword.trim(), idetifierAdmin.Password)
    }
    if(!match) {
        return next (new HttpError ("Wrong password", 420))
    }
    const hashedPw = await bcrypt.hash(newPassword, saltRound)
    try {
    AccM.updateUser({Id : req.userData.userId,username : null,Password : hashedPw})
    }
    catch (err) {
        console.error(err)
        return next(new HttpError("Some error occurr when change password",500));
    }
    return res.json({message : "Password Changed"})
}

module.exports = {
    changePassword
}