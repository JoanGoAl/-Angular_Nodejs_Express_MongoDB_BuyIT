const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('express').Router()

let client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterPracticaEndpoint = (endpoint) => new client.Counter({
    name: `${endpoint}_endpoint`,
    help: `Total de peticiones para el endpoint ${endpoint}`
})

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(morgan('dev'))


router.use('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
});

// router.use('/products', (req, res) => { counterPracticaEndpoint('products').inc() }, require('./product.route'))
// router.use('/categories', (req, res) => { counterPracticaEndpoint('categories').inc() }, require('./category.route'))
// router.use('/productsXcategory', (req, res) => { counterPracticaEndpoint('productsXcategory').inc() }, require('./productsXcategory.route'))
// router.use('/auth', (req, res) => { counterPracticaEndpoint('auth').inc() }, require('./user.routes'))
// router.use('/profile', (req, res) => { counterPracticaEndpoint('profile').inc() }, require('./profile.routes'))
// router.use('/comments', (req, res) => { counterPracticaEndpoint('comments').inc() }, require('./comments.routes'))

module.exports = router;