const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
    categories: [{ type: String }],
    description: String,
    img_url: [{ type: String }],
    condition: String,
    owner: String,
    price: String
}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema)