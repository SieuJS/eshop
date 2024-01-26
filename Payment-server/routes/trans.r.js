const router = require('express').Router();
const {transaction, getTransByPage}= require('../controllers/trans.c')

router.post("/", transaction);
router.get("/get-by-page", getTransByPage);

module.exports = router