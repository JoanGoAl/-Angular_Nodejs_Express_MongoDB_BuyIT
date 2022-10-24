let mongoose = require('mongoose')
let router = require('express').Router()
let { UserController } = require('../controllers') 
let { AuthMiddleware } = require('../middlewares')

router.get('/', AuthMiddleware.required, )