const router = require('express').Router()
const { ProductController } = require('../controllers')

router.get('/getProducts', ProductController.getProducts)
router.get('/getOneProduct', ProductController.getOneProduct)
router.get('/getOneProduct/:id', ProductController.getOneProduct)
router.get('/getProductsStartsWith', ProductController.getProductsStartsWith)
router.post('/addProduct', ProductController.addProduct)
router.put('/updateProduct', ProductController.updateProduct)
router.delete('/deleteProduct/:id', ProductController.deleteProduct)
router.get('/setLikeDislike', ProductController.setLikeDislike)

module.exports = router