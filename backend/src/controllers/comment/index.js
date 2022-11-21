const commentController = require('./comment.controller')

exports.getProductComments = async (req, res) => {
    try {
        res.json(await commentController.getProductComments(req.params.product_id))
    } catch (e) { res.json(e) }
}

exports.getUserComments = async (req, res) => {
    try {
        res.json(await commentController.getUserComments(req.params.user_id))
    } catch (e) { res.json(e) }
}

exports.setProductCommentary = async (req, res) => {
    try {
        let obj = {
            user_id: req.auth.uuid,
            product_id: req.body.product_id,
            body: req.body.body
        }

        res.json(await commentController.setProductCommentary(obj))
    } catch (e) { res.json(e) }
}

exports.deleteProductCommentary = async (req, res) => {
    try {
        res.json(await commentController.deleteProductCommentary(req.params.comment_id))
    } catch (e) { res.json(e) }
}