const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const paymentKey = process.env.JWT_SECOND;
const HttpError = require('../models/http-error')
const AdminC = require('../controllers/admin.c')
const checkAuth = require('../middlewares/check-auth')
const checkRole= require('../middlewares/check-role');
const accC = require('../controllers/acc.c')



router.post('/login',AdminC.signInHandler );

router.get("/list/page",checkAuth,checkRole, accC.getList);

router.get("/trans/get-by-page" , checkAuth,checkRole,AdminC.getTransByPage)


router.get("/token",checkAuth,checkRole, (req, res) => {
    let token ;
    try {
        token = jwt.sign(
        {
            message : "Main server"
            
        }, 
        paymentKey, 
        {expiresIn : "1h"}
        )
    }catch (err) {
        console.error(err)
        return next (new HttpError("Some error occur when sign jwt", 500))
    }
    res.json({message : "Create token succes" , token })
})

router.post("/changePassword",checkAuth,checkRole,AdminC.changePassword)

module.exports = router;