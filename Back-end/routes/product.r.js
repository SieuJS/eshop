const express = require("express");
const router = express.Router();
const multer = require('multer');
const productC = require("../controllers/product.c");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({storage})

router.get("/:catID", productC.getProductByCat);
router.post("/add", upload.single('proImage'), productC.addProduct);

module.exports = router;