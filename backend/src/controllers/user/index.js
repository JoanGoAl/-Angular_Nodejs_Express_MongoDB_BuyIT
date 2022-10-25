const userController = require('./user.controller')

// exports.getUser = async (req, res) => {
//     try {
//         return await userController.getUser(req.payload.id)
//     } catch (e) { return e }
// }

exports.login = async (req, res) => {
    let user
    try {
        user = await userController.login(req.body)
    } catch (err) {
        user = err
    }
    res.json(user)
}

exports.register = async (req, res) => {
    try {
        return await userController.register(req.body, res)
    } catch (error) { return error }
}