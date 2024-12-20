const {
  selectArticleById,
  selectArticles,
  patchArticle,
  postArticle,
  deleteArticle,
} = require("../models/articles-model");
const { checkRowExists } = require("../models/checker-model");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  const promises = [selectArticles(sort_by, order, topic)];

  if (topic) {
    promises.push(checkRowExists("topics", "slug", topic));
  }

  Promise.all(promises)
    .then(([articles]) => {
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

exports.addArticle = (req, res, next) => {
  const { author, title, body, topic, article_img_url } = req.body;

  postArticle(author, title, body, topic, article_img_url)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.removeArticle = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [
    checkRowExists("articles", "article_id", article_id),
    deleteArticle(article_id),
  ];

  Promise.all(promises)
    .then(() => {
      res.status(204);
      res.send();
    })
    .catch(next);
};
