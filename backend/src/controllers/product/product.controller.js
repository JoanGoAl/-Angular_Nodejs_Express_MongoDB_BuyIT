const { ProductModel, ProductsXCategories, CategoryModel } = require('../../models')

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
        let idCategories = []
        for (let i = 0; i < data.categories.length; i++) {
            let aux = await CategoryModel.find({ title: data.categories[i] })
            idCategories.push(aux[0]._id);
        }
        
        const createProduct = await ProductModel.create(data)

        let addInPxC = []
        for (let i = 0; i < idCategories.length; i++) {
            let auxPxC = await ProductsXCategories.updateOne({ id_category: idCategories[i] }, { $push: { id_products: createProduct._id } })
            addInPxC.push(auxPxC);
        }

        return {
            createProduct,
            addInPxC
        }
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

exports.getOneProduct = async (_id, defaultOption = true) => {
    try {
        if (!defaultOption) {
            let difference = await ProductModel.countDocuments({ categories: _id }).exec() - 0;
            let random = Math.floor(Math.random() * difference) + 0
            
            return await ProductModel.find({ categories: _id }).limit(1).skip(random)
        }
        return await ProductModel.find({ _id })
    } catch (e) {
        return e
    }
}