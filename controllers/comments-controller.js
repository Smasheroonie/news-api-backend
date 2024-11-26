const { checkArticleExists } = require("../models/articles-model");
const { selectComments, postComment } = require("../models/comments-model");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [selectComments(article_id), checkArticleExists(article_id)];

  Promise.all(promises)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addComment = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;

  postComment(username, body, article_id)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch(next);
};
