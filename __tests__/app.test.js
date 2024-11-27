const endpointsJson = require("../endpoints.json");

const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of topic objects with slug and description props", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });

  test("404: Responds with error message when given invalid endpoint", () => {
    return request(app).get("/api/dogs").expect(404);
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  test("404: Responds with error message if article does not exist", () => {
    return request(app)
      .get("/api/articles/99999999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not found");
      });
  });

  test("400: Responds with error message if given invalid input type", () => {
    return request(app)
      .get("/api/articles/dogs")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
          expect(article).not.toHaveProperty("body");
        });
      });
  });

  test("200: Responds with articles in descending order by date by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an array of comment objects", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments.length).toBe(2);
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 3,
          });
        });
      });
  });

  test("200: Response is in descending order by comment age", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("200: Responds with empty array if the article exists but has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([]);
      });
  });

  test("404: Responds with error message if article does not exist", () => {
    return request(app)
      .get("/api/articles/99999999/comments")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not found");
      });
  });

  test("400: Responds with error message if given invalid input type", () => {
    return request(app)
      .get("/api/articles/dogs/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with new posted comment object", () => {
    const newComment = {
      username: "rogersop",
      body: "You should probably shorten this article",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          comment_id: 19,
          votes: 0,
          created_at: expect.any(String),
          author: "rogersop",
          body: "You should probably shorten this article",
          article_id: 2,
        });
      });
  });

  test("400: Responds with error message if given empty comment", () => {
    const newComment = {
      username: "rogersop",
      body: "",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: Responds with error message if given empty username", () => {
    const newComment = {
      username: "",
      body: "hi!",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: Responds with error message if comment is not a string", () => {
    const newComment = {
      username: "rogersop",
      body: 12,
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: Responds with error message if username is not a string", () => {
    const newComment = {
      username: 32,
      body: "hi!",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: Responds with error message if given empty object", () => {
    const newComment = {};

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("404: Responds with error message if user does not exist", () => {
    const newComment = {
      username: "johnregex",
      body: "I love regex!",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not found");
      });
  });

  test("404: Responds with error message if article does not exist", () => {
    const newComment = {
      username: "rogersop",
      body: "You should probably shorten this article",
    };
    return request(app)
      .post("/api/articles/99999999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not found");
      });
  });

  test("400: Responds with error message if given invalid input type for article_id", () => {
    const newComment = {
      username: "rogersop",
      body: "You should probably shorten this article",
    };
    return request(app)
      .post("/api/articles/dogs/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Responds with updated article when votes increased", () => {
    const update = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/11")
      .send(update)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toMatchObject({
          author: "icellusedkars",
          title: "Am I a cat?",
          article_id: 11,
          topic: "mitch",
          created_at: "2020-01-15T22:21:00.000Z",
          votes: 1,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
        });
      });
  });

  test("200: Responds with updated article when votes decreased", () => {
    const update = { inc_votes: -10 };

    return request(app)
      .patch("/api/articles/1")
      .send(update)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toMatchObject({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          topic: "mitch",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 90,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          body: "I find this existence challenging",
        });
      });
  });

  test("400: Responds with error message when given empty object", () => {
    const update = {};

    return request(app)
      .patch("/api/articles/1")
      .send(update)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: Responds with error message when inc_votes is not a number", () => {
    const update = { inc_votes: "5" };

    return request(app)
      .patch("/api/articles/1")
      .send(update)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: Responds with error message when article type is not valid", () => {
    const update = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/dogs")
      .send(update)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("404: Responds with error message when article does not exist", () => {
    const update = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/900")
      .send(update)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not found");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Deletes entry and responds with no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  test("400: Responds with error message if given invalid id type", () => {
    return request(app)
      .delete("/api/comments/dog")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("404: Responds with error message if article id not found", () => {
    return request(app)
      .delete("/api/comments/999999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not found");
      });
  });
});
