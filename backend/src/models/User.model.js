var mongoose = require("mongoose");
var argon2 = require('argon2')
const { v4: uuidv4 } = require('uuid');
var uniqueValidator = require("mongoose-unique-validator");
// var slug = require("slug");
var jwt = require('jsonwebtoken')
const { SECRET } = require("../config");

const UserSchema = mongoose.Schema({
  uuid: { type: String, unique: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String, },
  bio: { type: String, maxLength: 300 },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
})

UserSchema.plugin(uniqueValidator, { message: "is already taken" })

UserSchema.pre("validate", async function (next) {
  this.uuid = uuidv4();
  this.avatar = `https://api.multiavatar.com/${this.username}.png`;
  this.password = await this.hashPassword()
  next()
})

UserSchema.methods.hashPassword = async function () {
  return argon2.hash(this.password)
}

UserSchema.methods.validatePassword = async function (password) {
  try {
    return await argon2.verify(this.password, password)
  } catch (error) {
    return error
  }
}

UserSchema.methods.uuidGenerate = function () {
  this.uuid = uuidV3();
}

UserSchema.methods.generateToken = function () {
  var today = new Date()
  var exp = new Date(today)
  exp.setDate(today.getDate() + 60)
  return jwt.sign({
    id: this.uuid,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, secret)
}

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateToken(),
    bio: this.bio,
    image: this.image
  }
}

module.exports = mongoose.model("User", UserSchema);