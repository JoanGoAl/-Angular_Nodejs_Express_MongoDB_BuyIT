const mongoose = require("mongoose");
const argon2 = require("argon2");
const uuidV3 = require("uuid").v3;
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const UserSchema = mongoose.Schema({
  uuid: { type: String, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, requred: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  biography: { type: String, maxLength: 300 },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "favorites" }],
});

UserSchema.pre("validate", (next) => {
  this.uuid = uuidV3();
  this.avatar = `https://api.multiavatar.com/${this.username}.png`;
  this.passwd = this.hashPassword();

  next();
});

UserSchema.methods.hashPassword = async function () {
  let hash = await argon2.hash(this.password);
  return hash;
};

UserSchema.methods.verificatePassword = async function (passwd) {
  this.password = await argon2.verify(this.password, passwd);
};

UserSchema.methods.generateJWT = function () {
  let now = new Date();
  let exp = new Date(now);
  exp.setDate(now.getDate() + 60);

  return jwt.sign(
    {
      uuid: this.uuid,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    SECRET
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.biography,
    avatar: this.avatar,
  };
};

UserSchema.methods.profileToJSON_For = function (user) {
  return {
    username: this.username,
    bio: this.biography,
    avatar: this.avatar,
    // following: user ? user.isFollowing(this._id) : false
  };
};


module.exports = mongoose.model('user', UserSchema)