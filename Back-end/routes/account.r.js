const express = require("express");
const router = express.Router();
const accC = require("../controllers/acc.c.js");

router.post("/register", accC.signUpHandler);
router.post("/login", accC.logInHandler);

module.exports = router;