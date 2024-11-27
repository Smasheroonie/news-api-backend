const db = require("../db/connection");

exports.selectArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortBy = [
    "created_at",
    "author",
    "title",
    "article_id",
    "topic",
    "votes",
    "article_img_url",
    "comment_count",
  ];

  const validOrder = ["asc", "desc"];

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const queryValues = [];

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
    `;

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    const articles = rows;
    articles.forEach((article) => {
      article.comment_count = Number(article.comment_count);
    });
    return articles;
  });
};

exports.selectArticleById = (article_id) => {
  let queryStr = `SELECT 
    articles.created_at,
    articles.article_id,
    articles.author,
    articles.title,
    articles.topic,
    articles.votes,
    articles.body,
    articles.article_img_url,
    COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON
    articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    `;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    const article = rows[0];
    article.comment_count = Number(article.comment_count);
    return article;
  });
};

exports.patchArticle = (update, article_id) => {
  if (!update || typeof update !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }

  let queryStr = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`;

  return db.query(queryStr, [update, article_id]).then(({ rows }) => {
    return rows[0];
  });
};
