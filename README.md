# Northcoders News API

Welcome to my News API Back End project!

This project was made to demonstrate knowledge of various back end technologies, including Express and PostgreSQL. Designed as a RESTful API, this project mimics a real-world back end service of a news site.

This project has the following features:

* Serves topics, articles, comments and user information.
* Provides for queries to specify and navigate through data.
* Allows new comments to be posted to individual articles.
* Allows article information to be updated.
* Allows for deletion of comments.

The hosted version of this project can be found [here.](https://nc-news-dd8e.onrender.com/api)

The front end part of this project can be found [here.](https://github.com/Smasheroonie/nc-news-frontend)

## Requirements

* Node.js version v22.9.0 or later
* PostgreSQL 16.4

## Setup

To clone the repository, start by clicking "Code" at the top of this page and copy the given URL. Then enter the following in your terminal:

``` Bash
git clone https://github.com/Smasheroonie/news-api-backend.git
code news-api-backend
```
This will clone and open the new folder in VS Code.

Create two new files called .env.test and .env.development in the root folder of the project, and add the following:
```
// .env.test
PGDATABASE=nc_news_test
```
```
// .env.development
PGDATABASE=nc_news
```

Open your terminal in VS Code and run the following commands:

``` Bash
npm install
```

You should now be able to run the following commands in order to start your database and seed it with the data:

``` Bash
npm run setup-dbs
npm run seed
```
Finally, you can run tests:

``` Bash
npm test app
```

Thank you for viewing my project!
--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
