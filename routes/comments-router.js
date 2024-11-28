const { removeComment, updateComment } = require('../controllers/comments-controller');

commentsRouter = require('express').Router();

commentsRouter
    .route("/:comment_id")
    .delete(removeComment)
    .patch(updateComment)

module.exports = { commentsRouter }