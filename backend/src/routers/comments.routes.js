const router = require('express').Router()
const { CommentController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')

router.get('/product/:product_id', AuthMiddleware.optional, CommentController.getProductComments)
router.get('/user/:user_id', AuthMiddleware.optional, CommentController.getUserComments)
router.post('/setProductCommentary', AuthMiddleware.required, CommentController.setProductCommentary)

module.exports = router