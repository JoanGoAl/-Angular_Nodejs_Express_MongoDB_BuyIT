const mongoose = require('mongoose')

const ProductsXCategories = mongoose.Schema({
    id_category: String,
    id_products: [{ type: String }]
})

module.exports = mongoose.model('productXcategory', ProductsXCategories)