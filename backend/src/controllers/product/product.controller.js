const {
  ProductModel,
  ProductsXCategories,
  CategoryModel,
  UserModel,
} = require("../../models");
const { user } = require("../user");

exports.getProducts = async (auth, params) => {
  try {
    const docs = await ProductModel.find().skip(params.count).limit(params.offset);
    if (auth) {
      let userFavorites = (await UserModel.findOne({ uuid: auth.uuid }).populate('favorites').lean()).favorites

      docs.map((e) => {
        userFavorites.map((i) => i.slug == e.slug ? e.liked = true : null)
      })
    }
    return docs;
  } catch (e) {
    return e;
  }
};

exports.getNpages = async () => {
  return Math.round(await ProductModel.find().countDocuments() / 2)
}

exports.addProduct = async (data) => {
  try {
    let idCategories = [];
    for (let i = 0; i < data.categories.length; i++) {
      let aux = await CategoryModel.find({ title: data.categories[i] });

      if (aux.length != 0) idCategories.push(aux[0]._id);
    }

    const createProduct = await ProductModel.create(data);

    let addInPxC = [];
    for (let i = 0; i < idCategories.length; i++) {
      let auxPxC = await ProductsXCategories.updateOne(
        { id_category: idCategories[i] },
        { $push: { id_products: createProduct._id } }
      );
      addInPxC.push(auxPxC);
    }

    return {
      createProduct,
      addInPxC,
    };
  } catch (e) {
    return e;
  }
};

exports.updateProduct = async (data) => {
  try {
    const res = await ProductModel.updateOne({ _id: data._id }, data);
    return res;
  } catch (e) {
    return e;
  }
};

exports.deleteProduct = async (_id) => {
  try {
    const res = await ProductModel.deleteOne({ _id });
    return res;
  } catch (e) {
    return e;
  }
};

exports.getOneProduct = async (_id, defaultOption = true) => {
  try {
    if (!defaultOption) {
      let difference =
        (await ProductModel.countDocuments({ categories: _id }).exec()) - 0;
      let random = Math.floor(Math.random() * difference) + 0;

      return await ProductModel.find({ categories: _id })
        .limit(1)
        .skip(random)
        .lean();
    } else {
      let userFavorites = []
      if (typeof _id.auth != "undefined") {
        userFavorites = (await UserModel.findOne({ uuid: _id.auth.uuid }).populate('favorites').lean()).favorites
      }
      let product = (await ProductModel.find({ slug: _id.params.id }))[0].toObject()

      userFavorites.map((i) => i.slug == product.slug ? product.liked = true : null)


      return product;
    }


  } catch (e) {
    return e;
  }
};

exports.getProductsStartsWith = async (string) => {
  try {
    return await ProductModel.find({ name: { $regex: `^${string}` } });
  } catch (e) {
    return e;
  }
};

exports.setLikeDislike = async (product_slug, auth) => {
  let product_id = (await ProductModel.findOne({ slug: product_slug }).lean())._id
  let user = await UserModel.findOne({ uuid: auth.uuid })

  if (user.favorites.includes(product_id)) {
    if (await UserModel.findOneAndUpdate({ uuid: auth.uuid }, { $pull: { favorites: product_id } })) return false

  }

  if (await UserModel.findOneAndUpdate({ uuid: auth.uuid }, { $push: { favorites: product_id } })) return true
};

exports.getUserProducts = async ({ products }) => {

  let userProducts = []
  for (let i = 0; i < products.length; i++) {
    userProducts.push(await ProductModel.findOne({ _id: products[i] }))
  }

  return userProducts
}
