const router = require('express').Router()
const { ProductsXcateogryController } = require('../controllers')

router.get('/getProductsXcategory', ProductsXcateogryController.getProductsXcategory)

module.exports = router