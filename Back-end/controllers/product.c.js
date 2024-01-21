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

    getProductByPage: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const catID = req.query.catID;
            const name = req.query.keyword || ''
            const sort = req.query.sort || ''
            const pageSize = 2; // số dòng trên 1 trang  
            const result = await productM.getByPage(catID, name, page, pageSize, sort);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    getProductByProID: async (req, res, next) => {
        try {
            const proID = req.params.proID;
            const category = await productM.getByProID(proID);
            res.json({ success: true, data: category})
        } catch (error) {
            next(error)
        }
    },

    addProduct: async (req, res, next) => {
        try {
            // const maxProID = await productM.getMaxID();
            const entity = {
                // ProID: maxProID.max + 1,
                ProName: req.body.proName,
                TinyDes: req.body.proTinyDes,
                FullDes: req.body.proFullDes,
                Price: req.body.proPrice,
                CatID: req.body.catID,
                Quantity:req.body.proQuantity
            }
            if (req.file) {
                entity.Image = `http://localhost:3000/images/${req.file.filename}`
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

    delete: async (req, res, next) => {
        try {
            const proID = req.query.proID;
            const data = await productM.deleteProduct(proID)
            res.json({ success: true, data: data })
        } catch (error) {
            next(error);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const entity = {
                ProID: parseInt(req.body.proID),
                ProName: req.body.proName,
                TinyDes: req.body.proTinyDes,
                FullDes: req.body.proFullDes,
                Price: parseFloat(req.body.proPrice),
                CatID: parseInt(req.body.catID),
                Quantity:parseInt(req.body.proQuantity)
            }
            if (req.file) {
                entity.Image = `http://localhost:3000/images/${req.file.filename}`
            }
            const data = await productM.updateProduct(entity)
            res.json({success: true, data:data})
        } catch (error){
            next(error);
        }
    }

}