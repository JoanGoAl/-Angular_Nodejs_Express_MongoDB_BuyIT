const userController = require('./user.controller')

exports.user = async (req, res) => {
    item = {}
    try {
        item = await userController.user(req.auth)
    } catch (e) {
        item = e
    }
    res.json(item)
}

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
        user = { msg: "Usuario o contraseña incorrectos" }
    }
    res.json(user)
}

exports.register = async (req, res) => {
    try {
        res.json(await userController.register(req.body, res))
    } catch (e) {
        res.json(e)
    }
}

exports.getFollowingUsers = async (req, res) => {
    item = {}
    try {
        item = await userController.getFollowingUsers(req.body)
    } catch (e) {
        item = e
    }
    res.json(item)
}

