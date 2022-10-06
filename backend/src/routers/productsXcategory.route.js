const router = require('express').Router()
const { ProductsXcateogryController } = require('../controllers')

router.get('/getProductsXcategory', ProductsXcateogryController.getProductsXcategory)
router.get('/getProductsByCatTitle/:title', ProductsXcateogryController.getProductsXcategoryByCatTitle)

module.exports = router