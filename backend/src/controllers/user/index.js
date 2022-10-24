const userController = require('./user.controller')

// exports.getUser = async (req, res) => {
//     try {
//         return await userController.getUser(req.payload.id)
//     } catch (e) { return e }
// }

exports.register = async (req, res, next) => {
    try {
        return await userController.register(req, res, next)
    } catch (error) { return error }
}