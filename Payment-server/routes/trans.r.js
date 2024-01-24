const router = require('express').Router();
const {transaction}= require('../controllers/trans.c')

router.post("/", transaction);

module.exports = router