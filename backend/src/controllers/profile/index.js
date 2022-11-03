const { mongo, default: mongoose } = require("mongoose");
let { UserModel } = require("../../models");
let ObjectId = require("mongoose").ObjectId;

exports.getUser = async (req, res, next) => {
  if (req.payload) {
    UserModel.findById(req.payload.id).then((user) => {
      if (!user) res.json({ profile: req.profile.toProfileJSONFor(false) });

      res.json({ profile: req.profile.toProfileJSONFor(user) });
    });
  } else res.json({ profile: req.profile.toProfileJSONFor(false) });
};

exports.follow = async (req, res, next) => {
  let profileID = mongoose.Types.ObjectId(req.profile._id);

  UserModel.findOne({ uuid: req.auth.uuid }).then((user) => {
    if (!user) res.sendStatus(404)

    user.follow(profileID).then(() => { res.json({ profile: req.profile.toProfileJSONFor(user) })})
  })
};

exports.unfollow = async (req, res) => {
    let profileID = mongoose.Types.ObjectId(req.profile._id)

    UserModel.findOne({ uuid: req.auth.uuid }).then((user) => {
        if (!user) res.sendStatus(404)

        user.unfollow(profileID).then(() => { res.json({ profile: req.profile.toProfileJSONFor(user) }) })
    })
}
