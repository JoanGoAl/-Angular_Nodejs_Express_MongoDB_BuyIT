let mongoose = require('mongoose')
let router = require('express').Router()
let { UserController } = require('../controllers')
let { AuthMiddleware } = require('../middlewares')

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/getUser/:username", AuthMiddleware.optional, UserController.getUser)
router.get("/user", AuthMiddleware.required, UserController.user)
router.post("/getFollowingUsers", AuthMiddleware.optional, UserController.getFollowingUsers)


module.exports = router