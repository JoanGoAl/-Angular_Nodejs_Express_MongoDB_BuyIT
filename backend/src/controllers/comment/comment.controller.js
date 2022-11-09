const { CommentModel, ProductModel, UserModel } = require("../../models");

exports.getProductComments = async (product_id) => {
    let comments = await CommentModel.find({ product_id })

    let result = await Promise.allSettled(
        comments.map(async (i) => {
            let userInfo = await UserModel.findOne({ uuid: i.user_id})

            i = {
                ...i._doc,
                username: userInfo.username
            }

            return i
        })
    )

    return result.map((e) => { return { ...e.value } })
  
};

exports.getUserComments = async (user_id) => {
  return await CommentModel.find({ user_id })
};

exports.setProductCommentary = async (values) => {
  return await CommentModel.create({
    user_id: values.user_id,
    product_id: values.product_id,
    body: values.body,
  });
};
