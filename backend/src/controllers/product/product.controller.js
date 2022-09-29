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

exports.updateProduct = (data) => {
    return ProductModel.updateOne({ _id: data._id }, data)
        .then((res) => res)
        .catch((e) => e)
}

exports.deleteProduct = (_id) => {
    return ProductModel.deleteOne({ _id })
        .then((res) => res)
        .catch((e) => e)
}