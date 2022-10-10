const { ProductsXCategories, CategoryModel, ProductModel } = require('../../models')

exports.getProductsXcategory = async () => {
    try {
        const docs = await ProductsXCategories.find()
        return docs
    } catch (e) {
        return e
    }
}

exports.getProductsXcategoryByCatTitle = async ({ title }) => {
    try {
        const catID = await CategoryModel.find({ title })
        const docs = await ProductsXCategories.find({ id_category: catID[0]._id })
        const idProducts = docs[0].id_products.map(item => { return { _id: item } })
        const allProducts = await ProductModel.find({ $or: idProducts })
        
        return allProducts
    } catch (e) {
        return e
    }
}