const { UserModel } = require('../../models')

exports.getUser = async ({ username }, auth) => {
    let data = await UserModel.findOne({ username })
    if (!data) return { error: 'El usuario no existe' }
    return data.parse(data, auth)
}

exports.user = async (auth) => {
    let data = await UserModel.findOne({ uuid: auth.uuid })
    if (!data) return { error: 'El usuario no existe' }
    return data.toAuthJSON()
}

exports.login = async (userInfo) => {
    const data = await UserModel.findOne({ "username": userInfo.username })

    if (await data.validatePassword(userInfo.password)) {
        return data.toAuthJSON()
    } else {
        return { error: "Usuario o contraseña incorrectos" }
    }
}

exports.register = async (userInfo) => {
    const data = await UserModel.create(userInfo)

    if (await data.validatePassword(userInfo.password)) {
        return data.toAuthJSON()
    } else {
        return { error: "Error al registrar" }
    }
};

exports.getUserFavorites = async (uuid) => {
    return await UserModel.findOne({ uuid }).populate('favorites')
}

exports.getFollowingUsers = async ({ users }) => {

    let userFollowers = []
    for (let i = 0; i < users.length; i++) {
        let data = await UserModel.findOne({ _id: users[i] })
        userFollowers.push(data.parse(data))
    }
    return userFollowers
}

