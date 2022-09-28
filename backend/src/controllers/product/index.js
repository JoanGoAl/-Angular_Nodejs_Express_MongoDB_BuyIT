const productController = require('./product.controller')

exports.getProducts = async (req, res) => {
    try {
        res.json(await productController.getProducts())
    } catch (e) {
        throw new Error(e)
    }
}

exports.addProduct = async (req, res) => {
    try {
        res.json(await productController.addProduct(req.body))
    } catch (e) {
        throw new Error(e)
    }
}