const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: String,
    icon: String,
})

module.exports = mongoose.model('category', CategorySchema)