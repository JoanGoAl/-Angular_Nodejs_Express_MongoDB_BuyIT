const { UserModel } = require('../../models')
var mongoose = require("mongoose");
// const User = mongoose.model("User");

// exports.getUser = async (_id) => {
//     try {
//         return await UserModel.findOne({ _id })
//     } catch (e) { return e }
// }

exports.register = async (req, res, next) => {
    res.json({ hola: "hola" })
    // try {
    //     var user = new User();
    //     user.username = req.body.user.username;
    //     user.email = req.body.user.email;
    //     user.setPassword(req.body.user.password);
    //     console.log(user);

    //     await user
    //         .save()
    //         .then(function () {
    //             return res.json({ user: user.toAuthJSON() });
    //         })
    //         .catch(next);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send("Hubo un error");
    // }
};