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

exports.follow = async (req) => {
    let profileID = mongoose.Types.ObjectId(req.profile._id);

    return UserModel.findOne({ uuid: req.auth.uuid }).then((user) => {
        if (!user) return 404

        return user.follow(profileID).then(() => { return { profile: req.profile.toProfileJSONFor(user) } })
    })
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