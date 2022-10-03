const productXcategoryController = require('./productsXcategory.controller')

exports.getProductsXcategory = async (req, res) => {
    try {
        res.json(await productXcategoryController.getProductsXcategory())
    } catch (e) {
        throw new Error(e)
    }
}