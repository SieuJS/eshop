const router = require('express').Router();
const {transaction, getTransByPage,getTransByOrderID}= require('../controllers/trans.c')

router.post("/", transaction);
router.get("/get-by-page", getTransByPage);
router.get("/get-trans-by-orderid",getTransByOrderID);

module.exports = router