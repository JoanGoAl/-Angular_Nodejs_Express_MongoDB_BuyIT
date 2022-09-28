const { ProductModel } = require('../../models')

exports.getProducts = () => {
    return ProductModel.find()
        .then((docs) => docs)
        .catch((e) => e)
}

exports.addProduct = (data) => {
    return ProductModel.create(data)
        .then((docs) => docs)
        .catch((e) => e)
}