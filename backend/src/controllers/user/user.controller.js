const { UserModel } = require('../../models')
const mongoose = require("mongoose");
// var User = mongoose.model("User");

exports.getUser = async ({ username }, auth) => {
    let data = await UserModel.findOne({ username })
    return data.parse(data, auth)
}


exports.login = async (userInfo) => {
    const data = await UserModel.findOne({ "username": userInfo.username })
    if (await data.validatePassword(userInfo.password)) {
        return data.toAuthJSON()
    } else {
        return { msg: "User or password are incorrects" }
    }
}

exports.register = async (userInfo, res) => {
    let info = await UserModel.create(userInfo)
    return info
};