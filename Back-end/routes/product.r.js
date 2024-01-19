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

router.get("/:proid", productC.getById);
router.get("/delete" , productC.delete);
router.get("/:catID", productC.getProductByCat);
router.get("/get-by-pro/:proID", productC.getProductByProID);
router.post("/add", upload.single('proImage'), productC.addProduct);
router.post("/update", upload.single('proImage'), productC.updateProduct);

module.exports = router;