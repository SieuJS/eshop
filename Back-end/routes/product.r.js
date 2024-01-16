const express = require("express");
const router = express.Router();
const productC = require("../controllers/product.c");

router.get("/:catID", productC.getProductByCat);
router.post("/add", productC.addProduct);

module.exports = router;