const {
  selectArticleById,
  selectArticles,
  patchArticle,
} = require("../models/articles-model");
const { checkRowExists } = require("../models/checker-model");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [
    checkRowExists("articles", "article_id", article_id),
    selectArticleById(article_id),
  ];

  Promise.all(promises)
    .then(([_, article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;

  const promises = [
    checkRowExists("articles", "article_id", article_id),
    patchArticle(inc_votes, article_id),
  ];

  Promise.all(promises)
    .then(([_, article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
