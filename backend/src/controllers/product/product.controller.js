const { ProductModel, ProductsXCategories, CategoryModel } = require('../../models')

exports.getProducts = async () => {
    try {
        const docs = await ProductModel.find()
        return docs
    } catch (e) {
        return e
    }
}

exports.getProductsXCategories = async () => {
    try {
        const docs = await ProductsXCategories.find()
        return docs
    } catch (e) {
        return e
    }
}

exports.addProduct = async (data) => {
    try {
        // const docs = await ProductModel.create(data)

        // Arreglar el puto add product

        // let idCategories = []
        // for (let i = 0; i < data.categories.length; i++) {
        //     let aux = await CategoryModel.find({ title: data.categories[i] })
        //     idCategories.push(aux[0]._id);
        // }

        const docs = await this.getProductsXCategories()

        return docs


        // let addInPxC = []
        // for (let i = 0; i < idCategories.length; i++) {
        //     let auxPxC = await ProductsXCategories.updateOne({ _id: idCategories[i] }, { id_products: docs._id })
        //     addInPxC.push(auxPxC);
        // }
        // console.log(addInPxC);


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