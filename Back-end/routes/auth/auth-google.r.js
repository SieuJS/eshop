const express = require("express");
const router = express.Router();
const accGoogleController = require("../../controllers/google/acc-google.c");

// authenticate with Google
router.get("/:sub", accGoogleController.getUserBySub);
router.get("/check/:sub", accGoogleController.loginWithGoogle);
router.post("/register", accGoogleController.register);

// callback route of OAuth
/* router.get("/google/redirect", passport.authenticate('google', {
    failureRedirect: "/"
})); */

module.exports = router;