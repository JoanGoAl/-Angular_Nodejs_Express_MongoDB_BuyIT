const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('express').Router()

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(morgan('dev'))

router.use('/products', require('./product.route'))
router.use('/categories', require('./category.route'))
router.use('/productsXcategory', require('./productsXcategory.route'))

module.exports = router;