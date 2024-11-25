const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  let queryStr = `
    SELECT * FROM articles WHERE article_id = $1;`;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    const article = rows[0];
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: `No article for id: ${article_id}`,
      });
    }
    return article;
  });
};
