const db = require("../db/connection");

exports.selectComments = (article_id) => {
  let queryStr = `
    SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    return rows;
  });
};

exports.postComment = (username, body, article_id) => {
  if (!username || !body || typeof username !== "string" || typeof body !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }

  let queryStr = `
    INSERT INTO comments(author, body, article_id) VALUES ($1, $2, $3) RETURNING *`;

  return db.query(queryStr, [username, body, article_id]).then(({ rows }) => {
    const comment = rows[0];
    return comment;
  });
};