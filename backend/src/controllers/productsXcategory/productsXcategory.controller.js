const { ProductsXCategories } = require('../../models')

exports.getProductsXcategory = async () => {
    try {
        const docs = await ProductsXCategories.find()
        return docs
    } catch (e) {
        return e
    }
}