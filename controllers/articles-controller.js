const {
  selectArticleById,
  selectArticles,
  checkArticleExists,
} = require("../models/articles-model");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [
    selectArticleById(article_id),
    checkArticleExists(article_id),
  ];

  Promise.all(promises)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
