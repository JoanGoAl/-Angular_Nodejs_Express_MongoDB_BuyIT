const { UserModel } = require('../../models')
const mongoose = require("mongoose");
// var User = mongoose.model("User");

// exports.getUser = async (_id) => {
//     try {
//         return await UserModel.findOne({ _id })
//     } catch (e) { return e }
// }

exports.register = async (req, res, next) => {
    try {
        let info = await UserModel.create(req.body)
        res.json(info)
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha cascao");
    }
};