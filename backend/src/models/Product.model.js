const mongoose = require('mongoose')
const slugify = require('slugify')
const slug = require('mongoose-slug-generator');


const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    categories: [{ type: String }],
    description: String,
    imgUrl: [{ type: String }],
    condition: String,
    slug: { type: String, unique: true, required: true },
    owner: String,
    price: String,
}, {
    timestamps: true,
})

mongoose.plugin(slug);

ProductSchema.pre('validate', function (next) {
    if (this.name) this.slug = `${slugify(this.name, { lower: true, strict: true })}-${(Math.random() * Math.pow(36, 6) | 0).toString(36)}`
    next();
});

module.exports = mongoose.model('product', ProductSchema)