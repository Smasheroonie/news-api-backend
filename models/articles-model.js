const db = require("../db/connection");

exports.checkArticleExists = (article_id) => {
  let queryStr = `SELECT * FROM articles WHERE article_id = $1`;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({
        status: 404,
        msg: `No article for id: ${article_id}`,
      });
    }
  });
};

exports.selectArticles = () => {
  let queryStr = `SELECT 
    articles.created_at,
    articles.article_id,
    articles.author,
    articles.title,
    articles.topic,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON
    articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`;
  return db.query(queryStr).then(({ rows }) => {
    const articles = rows;
    articles.forEach((article) => {
      article.comment_count = Number(article.comment_count);
    });
    return articles;
  });
};

exports.selectArticleById = (article_id) => {
  let queryStr = `
    SELECT * FROM articles WHERE article_id = $1;`;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    const article = rows[0];
    return article;
  });
};
