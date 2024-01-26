const router = require('express').Router();
const {create, getAll, getBalance}= require('../controllers/acc.c')

router.post("/create", create);
router.get("/",getAll)
router.get("/get-balance/:id", getBalance);

module.exports = router