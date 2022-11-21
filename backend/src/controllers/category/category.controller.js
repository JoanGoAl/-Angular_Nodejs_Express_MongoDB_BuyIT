const { CategoryModel, ProductsXCategories } = require("../../models");

exports.getCategories = async () => {
  try {
    const docs = await CategoryModel.find();
    return docs;
  } catch (e) {
    return e;
  }
};

exports.getCategoriesLimited = async (count, offset) => {
  try {
    return await CategoryModel.find().skip(count).limit(offset);
  } catch (e) {
    return e;
  }
};

exports.addCategory = async (data) => {
  try {
    const createCat = await CategoryModel.create(data);
    const addInPxC = await ProductsXCategories.create({
      id_category: createCat._id,
    });
    return {
      createCat,
      addInPxC,
    };
  } catch (e) {
    return e;
  }
};

exports.updateCategory = async (data) => {
  try {
    const res = await CategoryModel.updateOne({ _id: data._id }, data);
    return res;
  } catch (e) {
    return e;
  }
};

exports.deleteCategory = async (_id) => {
  try {
    const res = await CategoryModel.deleteOne({ _id });
    return res;
  } catch (e) {
    return e;
  }
};

exports.getOneCategory = async (_id) => {
  try {
    const res = await CategoryModel.find({ _id });
    return res;
  } catch (e) {
    return e;
  }
};

exports.getCategoryInfo = async (arr) => {
  try {
    return await Promise.allSettled(
      await JSON.parse(arr).map(
        async (title) => await CategoryModel.find({ title }).lean()
      )
    );
  } catch (e) {
    return e;
  }
};
