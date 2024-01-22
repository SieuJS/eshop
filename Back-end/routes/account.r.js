const express = require("express");
const router = express.Router();
const accC = require("../controllers/acc.c.js");


router.get("/check/:username", accC.checkUsername);
router.get("/lock/:userId", accC.lockAcc)
router.post("/register", accC.signUpHandler);
router.post("/login", accC.logInHandler);
router.post("/update", accC.updateHandler);
router.post("/delete", accC.deleteHandler);
router.get("/:userId", accC.getUserById);

module.exports = router;