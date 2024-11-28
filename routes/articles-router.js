const { getArticles, getArticleById, updateArticle, addArticle } = require("../controllers/articles-controller");
const { getComments, addComment } = require("../controllers/comments-controller");

articlesRouter = require("express").Router();

articlesRouter
    .route("/")
    .get(getArticles)
    .post(addArticle)

articlesRouter
    .route("/:article_id")
    .get(getArticleById)
    .patch(updateArticle)

articlesRouter
    .route("/:article_id/comments")
    .get(getComments)
    .post(addComment)

module.exports = { articlesRouter }