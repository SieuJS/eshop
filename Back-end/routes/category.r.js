const express = require("express");
const router = express.Router();
const categoryC = require("../controllers/category.c");

router.get("/", categoryC.getAllCat);
router.get("/get-by-page", categoryC.getByPage);
router.post("/add", categoryC.addCategory);
router.get("/delete", categoryC.deleteCategory);
router.post("/update", categoryC.updateCategory);

module.exports = router;