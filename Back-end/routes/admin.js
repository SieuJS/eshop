const express = require("express");
const router = express.Router();
const checkAuth = require('../middlewares/check-auth')
const jwt = require("jsonwebtoken")
const paymentKey = process.env.JWT_SECOND;
const HttpError = require('../models/http-error')

const accC = require('../controllers/acc.c')
router.get('/', (req, res) => {
    res.json({message : "admin"});
})

router.get("/list/page", accC.getList);

router.get("/token", (req, res) => {
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

module.exports = router;