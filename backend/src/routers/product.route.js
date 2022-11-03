const router = require('express').Router()
const { ProductController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')

// router.param('comment', (req, res, next, id) => {
    
// })

router.get('/getProducts', AuthMiddleware.optional, ProductController.getProducts)
router.get('/getOneProduct', ProductController.getOneProduct)
router.get('/getOneProduct/:id', ProductController.getOneProduct)
router.get('/getProductsStartsWith', ProductController.getProductsStartsWith)
router.post('/addProduct', ProductController.addProduct)
router.put('/updateProduct', ProductController.updateProduct)
router.delete('/deleteProduct/:id', ProductController.deleteProduct)
router.get('/setLikeDislike', ProductController.setLikeDislike)
router.post('/:productID/like', ProductController.setLikeDislike)

module.exports = router