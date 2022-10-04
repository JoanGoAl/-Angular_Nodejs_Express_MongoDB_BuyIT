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
    price: String
}, {
    timestamps: true,
})

mongoose.plugin(slug);

ProductSchema.pre('validate', function(next) {
    if (!this.slug) this.slug = slugify(this.name)
    next();
});

module.exports = mongoose.model('product', ProductSchema)