const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    user_id: String,
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    body: String
})

module.exports = mongoose.model('comment', CommentSchema)