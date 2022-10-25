let mongoose = require('mongoose')
let router = require('express').Router()
let { UserController } = require('../controllers')
let { AuthMiddleware } = require('../middlewares')

router.post("/register", UserController.register)

module.exports = router