const router = require('express').Router();

router.get("/trans", (req, res) => {
    res.json({message : "Trans"})
})