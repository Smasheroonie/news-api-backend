const { checkArticleExists } = require("../models/articles-model");
const { selectComments } = require("../models/comments-model");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [selectComments(article_id), checkArticleExists(article_id)];

  Promise.all(promises)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
