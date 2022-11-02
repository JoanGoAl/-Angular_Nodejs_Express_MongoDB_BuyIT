const userController = require('./user.controller')

exports.getUser = async (req, res) => {
    item = {}
    try {
        item = await userController.getUser(req.params, req.auth)
    } catch (e) {
        item = e
    }
    res.json(item)
}

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
    let user
    try {
        user = await userController.register(req.body, res)
    } catch (error) {
        user = error
    }
    res.json(user)
}