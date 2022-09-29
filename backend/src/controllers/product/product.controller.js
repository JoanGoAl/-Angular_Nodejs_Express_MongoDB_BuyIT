const { ProductModel } = require('../../models')

exports.getProducts = async () => {
    try {
        const docs = await ProductModel.find()
        return docs
    } catch (e) {
        return e
    }
}

exports.addProduct = async (data) => {
    try {
        const docs = await ProductModel.create(data)
        return docs
    } catch (e) {
        return e
    }
}

exports.updateProduct = async (data) => {
    try {
        const res = await ProductModel.updateOne({ _id: data._id }, data)
        return res
    } catch (e) {
        return e
    }
}

exports.deleteProduct = async (_id) => {
    try {
        const res = await ProductModel.deleteOne({ _id })
        return res
    } catch (e) {
        return e
    }
}

exports.getOneProduct = async (_id) => {
    try {
        const res = await ProductModel.find({ _id })
        return res
    } catch (e) {
        return e
    }
}