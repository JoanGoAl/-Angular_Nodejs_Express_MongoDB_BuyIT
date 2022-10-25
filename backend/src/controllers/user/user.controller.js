const { UserModel } = require('../../models')
const mongoose = require("mongoose");
// var User = mongoose.model("User");

// exports.getUser = async (_id) => {
//     try {
//         return await UserModel.findOne({ _id })
//     } catch (e) { return e }
// }


exports.login = async (userInfo) => {
    try {
        const data = await UserModel.findOne({ "username": userInfo.username })
        if (await data.validatePassword(userInfo.password)) {
            console.log(await data.toAuthJSON());
            return await data.toAuthJSON()
        } else {
            return { msg: "User or password are incorrects" }
        }
    } catch (err) {
        return err;
    }
}

exports.register = async (userInfo, res) => {
    try {
        let info = await UserModel.create(userInfo)
        res.json(info)
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha cascao");
    }
};