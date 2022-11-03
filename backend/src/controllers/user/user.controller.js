const { UserModel } = require('../../models')

exports.getUser = async ({ username }, auth) => {
    let data = await UserModel.findOne({ username })
    if (!data) return { error: 'El usuario no existe' }
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

exports.register = async (userInfo) => {
    let info = await UserModel.create(userInfo)
    return info
};

exports.getUserFavorites = async (uuid) => {
    return await UserModel.findOne({ uuid }).populate('favorites')
}