const router = require('express').Router()
const { ProductController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')

router.get('/getProducts', AuthMiddleware.optional, ProductController.getProducts)
router.get('/getOneProduct', AuthMiddleware.optional, ProductController.getOneProduct)
router.get('/getOneProduct/:id', AuthMiddleware.optional, ProductController.getOneProduct)
router.get('/getProductsStartsWith', ProductController.getProductsStartsWith)
router.post('/addProduct', ProductController.addProduct)
router.put('/updateProduct', ProductController.updateProduct)
router.delete('/deleteProduct/:id', ProductController.deleteProduct)
router.post('/:slug/like', AuthMiddleware.required, ProductController.setLikeDislike)
router.post('/getUserProducts', ProductController.getUserProducts)
router.get('/getNpages', ProductController.getNPages)

module.exports = router