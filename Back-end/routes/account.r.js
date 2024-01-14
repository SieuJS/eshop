const express = require("express");
const router = express.Router();
const accC = require("../controllers/acc.c.js");

router.post("/register", accC.signUpHandler);
router.post("/login", accC.logInHandler);
router.post("/update", accC.updateHandler);
router.post("/delete", accC.deleteHandler);

module.exports = router;