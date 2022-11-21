const router = require('express').Router()
const { CommentController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')

router.get('/product/:product_id', AuthMiddleware.optional, CommentController.getProductComments)
router.get('/user/:user_id', AuthMiddleware.optional, CommentController.getUserComments)
router.post('/setProductCommentary', AuthMiddleware.required, CommentController.setProductCommentary)
router.delete('/deleteProductCommentary/:comment_id', AuthMiddleware.required, CommentController.deleteProductCommentary)

module.exports = router