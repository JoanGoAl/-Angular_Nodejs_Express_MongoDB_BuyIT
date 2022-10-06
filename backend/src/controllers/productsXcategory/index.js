const productXcategoryController = require('./productsXcategory.controller')

exports.getProductsXcategory = async (req, res) => {
    try {
        res.json(await productXcategoryController.getProductsXcategory())
    } catch (e) {
        throw new Error(e)
    }
}

exports.getProductsXcategoryByCatTitle = async (req, res) => {
    try {
        res.json(await productXcategoryController.getProductsXcategoryByCatTitle(req.params))
    } catch (e) {
        throw new Error(e)
    }
}