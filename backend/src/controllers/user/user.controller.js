const { UserModel } = require('../../models')

exports.getUser = async (_id) => {
    try {
        return await UserModel.findOne({ _id })
    } catch (e) { return e }
}

exports.login = async (userInfo) => {
    
}