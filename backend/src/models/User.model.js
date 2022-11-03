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
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

UserSchema.plugin(uniqueValidator, { message: "is already taken" })

UserSchema.pre("validate", async function (next) {
  if (!this.uuid) {
    this.avatar = `https://api.multiavatar.com/${this.username}.png`;
    this.password = await this.hashPassword()
    this.uuid = uuidv4();
  }
  
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

UserSchema.methods.generateToken = function () {
  var today = new Date()
  var exp = new Date(today)
  exp.setDate(today.getDate() + 60)
  return jwt.sign({
    uuid: this.uuid,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, SECRET)
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

UserSchema.methods.parse = function (data, auth) {
  if (auth && data.username === auth.username) {
    return {
      username: data.username,
      email: data.email,
      products: data.products,
      favorites: data.favorites,
      avatar: data.avatar
    }
  } else return {
    username: data.username,
    products: data.products,
  }
}

UserSchema.methods.toProfileJSONFor = function(user) {
  return {
    username: this.username,
    bio: this.bio,
    avatar: this.avatar,
    following: user ? user.isFollowing(this._id) : false
  }
}

UserSchema.methods.favorite = function(id) {
  if (this.favorites.indexOf(id) == -1) {
    this.favorites.push(id)
  }

  return this.save()
}

UserSchema.methods.unfavorite = function(id) {
  this.favorites.remove(id)

  return this.save()
}

UserSchema.methods.isFavorite = function(id) {
  return this.favorites.some(function(favoriteId) {
    return favoriteId.toString() === id.toString()
  })
}

UserSchema.methods.follow = function(id) {
  if (this.following.indexOf(id) == -1) {
    this.following.push(id)
  }

  return this.save()
}

UserSchema.methods.unfollow = function(id) {
  this.following.remove(id)

  return this.save()
}

UserSchema.methods.isFollowing = function(id) {
  return this.following.some((followingID) => followingID.toString() == id.toString())
}

module.exports = mongoose.model("User", UserSchema);