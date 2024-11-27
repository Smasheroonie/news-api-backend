const { checkRowExists } = require("../models/checker-model");
const {
  selectComments,
  postComment,
  deleteComment,
} = require("../models/comments-model");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [
    checkRowExists("articles", "article_id", article_id),
    selectComments(article_id),
  ];

  Promise.all(promises)
    .then(([_, comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addComment = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;

  const promises = [
    checkRowExists("articles", "article_id", article_id),
    postComment(username, body, article_id),
  ];

  Promise.all(promises)
    .then(([_, comment]) => {
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  const promises = [
    checkRowExists("comments", "comment_id", comment_id),
    deleteComment(comment_id),
  ];

  Promise.all(promises)
    .then(() => {
      res.status(204);
      res.send();
    })
    .catch(next);
};
