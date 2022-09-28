const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('express').Router()

router.use(cors({origin: 'http://localhost:4200'}));
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.use('/products', require('./product.route'))
// router.use('/categories', require('./category.router'))

module.exports = router;