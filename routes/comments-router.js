const { removeComment } = require('../controllers/comments-controller');

commentsRouter = require('express').Router();

commentsRouter
    .route("/:comment_id")
    .delete(removeComment)

module.exports = { commentsRouter }