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

exports.updateProduct = async (req, res) => {
    try {
        res.json(await productController.updateProduct(req.body))
    } catch (e) {
        throw new Error(e)
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        res.json(await productController.deleteProduct(req.params.id))
    } catch (e) {
        throw new Error(e)
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        res.json(await productController.getOneProduct(req.params.id))
    } catch (e) {
        throw new Error(e)
    }
}