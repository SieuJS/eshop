const router = require('express').Router();
const {create, getAll}= require('../controllers/acc.c')

router.post("/create", create);
router.get("/",getAll)

module.exports = router