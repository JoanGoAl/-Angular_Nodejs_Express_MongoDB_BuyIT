const router = require('express').Router()
const { ProductController } = require('../controllers')

router.get('/getProducts', ProductController.getProducts)
router.get('/getOneProduct', ProductController.getOneProduct)
router.get('/getOneProduct/:id', ProductController.getOneProduct)
router.post('/addProduct', ProductController.addProduct)
router.put('/updateProduct', ProductController.updateProduct)
router.delete('/deleteProduct/:id', ProductController.deleteProduct)

module.exports = router