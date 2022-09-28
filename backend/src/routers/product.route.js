const router = require('express').Router()
const { ProductController } = require('../controllers')

router.get('/getProducts', ProductController.getProducts)
router.post('/addProduct', ProductController.addProduct)

module.exports = router