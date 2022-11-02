const { ProductsXCategories, CategoryModel, ProductModel } = require('../../models')

exports.getProductsXcategory = async () => {
    try {
        const docs = await ProductsXCategories.find()
        return docs
    } catch (e) {
        return e
    }
}

exports.getProductsXcategoryByCatTitle = async (cats) => {
    try {
        let products_arr = []

        await Promise.allSettled(
            cats.title.split(',').map(async (title) => {
                const catID = await CategoryModel.findOne({ title })
                const docs = await ProductsXCategories.findOne({ id_category: catID._id })
                const idProducts = await docs.id_products.map((i) => { return { _id: i } })
                const products = await ProductModel.find({ $or: idProducts }).lean()

                products.map((p) => products_arr.push(p))
            })
        )
        
        return products_arr
    } catch (e) {
        return e
    }
}