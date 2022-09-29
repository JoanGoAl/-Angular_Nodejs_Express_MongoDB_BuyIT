const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
    categories: [{ type: String }],
    desciption: String,
    img_url: [{ type: String }],
    condition: String,
    owner: String
}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema)