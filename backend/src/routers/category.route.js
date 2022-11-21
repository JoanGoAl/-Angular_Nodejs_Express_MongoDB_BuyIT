const router = require('express').Router()
const { CategoryController } = require('../controllers')

router.get('/getCategories', CategoryController.getCategories)
router.get('/getOneCategory/:id', CategoryController.getOneCategory)
router.get('/getCategoryInfo', CategoryController.getCategoryInfo)
router.post('/addCategory', CategoryController.addCategory)
router.put('/updateCategory', CategoryController.updateCategory)
router.delete('/deleteCategory/:id', CategoryController.deleteCategory)

module.exports = router