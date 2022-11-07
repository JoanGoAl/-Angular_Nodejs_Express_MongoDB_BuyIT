const { mongo, default: mongoose } = require("mongoose");
let { UserModel } = require("../../models");
let ObjectId = require("mongoose").ObjectId;
const profileController = require('./profile.controller')

exports.getUser = async (req, res, next) => {
  try {
    res.json(await profileController.getUser(req))
  } catch (e) { res.json(e) }
};

exports.follow = async (req, res, next) => {
  try {
    let result = await profileController.follow(req)

    if (result == 404) res.sendStatus(404)
    else res.json(result)

  } catch (e) { res.json(e) }
};

exports.unfollow = async (req, res) => {
  try {
    let result = await profileController.unfollow(req)

    if (result == 404) res.sendStatus(404)
    else res.json(result)

  } catch (e) { res.json(e) }
}

exports.getNProducts = async (req, res) => {
  try {
    res.json(await profileController.getNProducts(req.params.username))
  } catch (e) { res.json(e) }
}