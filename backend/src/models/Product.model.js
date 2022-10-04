const mongoose = require('mongoose')
const slugify = require('slugify')
const slug = require('mongoose-slug-generator');


const ProductSchema = mongoose.Schema({
    name: String,
    categories: [{ type: String }],
    description: String,
    img_url: [{ type: String }],
    condition: String,
    slug: String,
    owner: String,
    price: String,
    slug: String
}, {
    timestamps: true,
})

mongoose.plugin(slug);

<<<<<<< HEAD
ProductSchema.pre('validate', function (next) {
=======
ProductSchema.pre('validate', function(next) {
>>>>>>> e852b8a3f535158730c7ec0102b3627b7668decd
    if (!this.slug) this.slug = slugify(this.name)
    next();
});

module.exports = mongoose.model('product', ProductSchema)