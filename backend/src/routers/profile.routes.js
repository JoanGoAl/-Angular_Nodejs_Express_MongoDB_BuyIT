let router = require("express").Router();
let mongoose = require("mongoose");
let UserModel = mongoose.model('User')
let { AuthMiddleware } = require('../middlewares')
let { ProfileController } = require('../controllers')

router.param('username', (req, res, next, username) => {
    UserModel.findOne({ username }).then((user) => {
        if (!user) return res.sendStatus(404)

        req.profile = user;
        return next()
    }).catch(next)
})

router.get('/:username', AuthMiddleware.optional, ProfileController.getUser)
router.post('/:username/follow', AuthMiddleware.required, ProfileController.follow)
router.get('/:username/nproducts', AuthMiddleware.optional, ProfileController.getNProducts)

module.exports = router