const { UserModel } = require('../../models')
const { mongo, default: mongoose } = require('mongoose')

exports.getUser = async (req) => {
    if (req.auth) {
        let user = await UserModel.findOne({ username: req.auth.username })

        if (!user) return { profile: req.profile.toProfileJSONFor(user) }

        console.log({ profile: req.profile.toProfileJSONFor(user) });
        return { profile: req.profile.toProfileJSONFor(user) };
    } else return { profile: req.profile.toProfileJSONFor(false) };
}

exports.getUserById = async (_id) => {
    return await UserModel.findOne({ _id });
}

exports.follow = async (req) => {
    let following = false;
    const user = await UserModel.findOne({ uuid: req.auth.uuid }).populate('following')
    const userFollow = await UserModel.findOne({ username: req.params.username })

    user.following.map((u) => u.uuid == userFollow.uuid ? following = true : null)

    if (following) {
        await UserModel.findOneAndUpdate({ uuid: req.auth.uuid }, { $pull: { following: userFollow._id } })
        return false
    } else {
        await UserModel.findOneAndUpdate({ uuid: req.auth.uuid }, { $push: { following: userFollow._id } })
        return true
    }
}

exports.getNProducts = async (username) => {
    return (await UserModel.findOne({ username }).lean()).products.length
}