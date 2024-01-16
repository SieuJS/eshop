const productM = require("../models/product.m");

module.exports = {
    getProductByCat: async (req, res, next) => {
        try {
            const catID = req.params.catID;
            const category = await productM.getByCat(catID);
            res.json({ success: true, data: category})
        } catch (error) {
            next(error)
        }
    },

    addProduct: async (req, res, next) => {
        try {
            const entity = {
                ProName: req.body.productName,
                TinyDes: req.body.description,
                FullDes: req.body.fullDescription,
                Price: req.body.productPrice,
                CatID: req.body.catID,
                Quantity:req.body.productQuantity
            }
            console.log(req.body);
            const data = await productM.add(entity);
            res.json({success: true, data:data})
        } catch (error) {
            next(error);
        }
    },

    // deleteCategory: async (req, res, next) => {
    //     try {
    //         const catID = req.query.CatID;
    //         const data = await categoryM.deleteByID(catID);
    //         res.json({ success: true, data: data })
    //     } catch (error) {
    //         next(error);
    //     }
    // },

    // updateCategory: async (req, res, next) => {
    //     try{
    //         const entity = {
    //             CatID: req.body.CatID,
    //             CatName: req.body.CatName
    //         }
    //         const data = await categoryM.updateByID(entity, entity.CatID);
    //         res.json({success: true, data:data})
    //     } catch (error){
    //         next(error);
    //     }
    // }

}