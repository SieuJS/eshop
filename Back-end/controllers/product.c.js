const productM = require('../models/product.m')

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
            const maxProID = await productM.getMaxID();
            const entity = {
                ProID: maxProID.max + 1,
                ProName: req.body.proName,
                TinyDes: req.body.proTinyDes,
                FullDes: req.body.proFullDes,
                Price: req.body.proPrice,
                CatID: req.body.catID,
                Quantity:req.body.proQuantity
            }
            if (req.file) {
                entity.ImageUrl = `https://localhost:3000/images/${req.file.filename}`
            }
            const data = await productM.add(entity);
            res.json({success: true, data:data})
        } catch (error) {
            next(error);
        }
    },
    getById: async (req,res,next) => {
        const id = req.params.proid;
        const rs = await productM.getById(id);
        rs[0].Price = parseInt(rs[0].Price,10);
        res.json(rs);
    }
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