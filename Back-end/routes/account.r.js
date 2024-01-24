const express = require("express");
const router = express.Router();
const googlePath = require("./auth/auth-google.r.js")
const accC = require("../controllers/acc.c.js");

const checkAuth = require("../middlewares/check-auth.js");
//router.use(checkAuth);

router.use("/google", googlePath);
router.get("/:userId", accC.getUserById);
router.get("/check/:username", accC.checkUsername);
// router.post("/checkpassword", checkAuth, accC.checkPassword);
router.post("/register", accC.signUpHandler);
router.post("/login", accC.logInHandler);
router.post("/update", checkAuth, accC.updateHandler);
router.post("/delete", accC.deleteHandler);
router.get("/:userId", accC.getUserById);

module.exports = router;