const express = require("express")
const router = express.Router();
const orderC = require('../controllers/order.c')
const checkAuth = require("../middlewares/check-auth")

router.post('/placeorder',checkAuth, orderC.placeOrder);

module.exports = router