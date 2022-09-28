const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: String,
    icon_url: String,
})

module.exports = mongoose.model('category', CategorySchema)