const categoryController = require('./category.controller')

exports.getCategories = async (req, res) => {
    try {
        if (req.query.offset && req.query.count) {
            if (req.query.offset != -1 && req.query.count != -1) {
                res.json(await categoryController.getCategoriesLimited(req.query.count, req.query.offset))
            } else {
                res.sendStatus(403)
            }
        } else {
            res.json(await categoryController.getCategories())
        }
    } catch (e) {
        throw new Error(e)
    }
}

exports.addCategory = async (req, res) => {
    try {
        res.json(await categoryController.addCategory(req.body))
    } catch (e) {
        throw new Error(e)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        res.json(await categoryController.updateCategory(req.body))
    } catch (e) {
        throw new Error(e)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        res.json(await categoryController.deleteCategory(req.params.id))
    } catch (e) {
        throw new Error(e)
    }
}

exports.getOneCategory = async (req, res) => {
    try {
        res.json(await categoryController.getOneCategory(req.params.id))
    } catch (e) {
        throw new Error(e)
    }
}

exports.getCategoryInfo = async (req, res) => {
    try {
        res.json(await categoryController.getCategoryInfo(req.query.categories))
    } catch (e) { res.json(e) }
}