const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('express').Router()

<<<<<<< HEAD
router.use(function (req, res, next) {
=======
router.use(function(req, res, next) {
>>>>>>> e852b8a3f535158730c7ec0102b3627b7668decd
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
<<<<<<< HEAD
router.use(cors())
// router.use(cors({ origin: 'http://localhost:4200' }));
=======
router.use(cors());
>>>>>>> e852b8a3f535158730c7ec0102b3627b7668decd
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.use('/products', require('./product.route'))
router.use('/categories', require('./category.route'))
router.use('/productsXcategory', require('./productsXcategory.route'))

module.exports = router;