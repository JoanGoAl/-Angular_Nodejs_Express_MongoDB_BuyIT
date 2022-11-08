const { UserModel } = require('../../models')
const { mongo, default: mongoose } = require('mongoose')

exports.getUser = async (req) => {
    if (req.payload) {
        UserModel.findById(req.payload.id).then((user) => {
            if (!user) return { profile: req.profile.toProfileJSONFor(false) };

            return { profile: req.profile.toProfileJSONFor(user) };
        });
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

exports.unfollow = async (req) => {
    let profileID = mongoose.Types.ObjectId(req.profile._id)

    return UserModel.findOne({ uuid: req.auth.uuid }).then((user) => {
        if (!user) res.sendStatus(404)

        return user.unfollow(profileID).then(() => { return { profile: req.profile.toProfileJSONFor(user) } })
    })
}

exports.getNProducts = async (username) => {
    return (await UserModel.findOne({ username }).lean()).products.length
}