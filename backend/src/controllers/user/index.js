const userController = require('./user.controller')

exports.getUser = async (req, res) => {
    try {
        return await userController.getUser(req.payload.id)
    } catch (e) { return e }
}