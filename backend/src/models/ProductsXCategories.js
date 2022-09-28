const mongoose = require('mongoose')

const ProductsXCategories = mongoose.Schema({
    id_product: String,
    id_categories: [{ type: String }]
})

module.exports = mongoose.model('productXcategory', ProductsXCategories)