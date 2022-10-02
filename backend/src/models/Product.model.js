const mongoose = require('mongoose')
const slugify = require('slugify')
const slug = require('mongoose-slug-generator');


const ProductSchema = mongoose.Schema({
    name: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    desciption: String,
    slug: { type: String, slug: "name" },
    img_url: [{ type: String }],
    condition: String,
    owner: String
}, {
    timestamps: true,
})

mongoose.plugin(slug);

ProductSchema.pre('validate', function(next) {
    if (!this.slug) throw new Error()
    next();
});


ProductSchema.methods.slugifyProduct = () => {
    this.slug = slugify(this.name)
}

module.exports = mongoose.model('product', ProductSchema)