'use strict';

// TODO DONE!!: Install and require the NPM Postgres package 'pg' into your server.js, and ensure that it is then listed as a dependency in your package.json

const fs = require('fs');
const express = require('express');

// REVIEW: Require in body-parser for post requests in our server. If you want to know more about what this does, read the docs!
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const pg = require('pg');
// TODO DONE: Complete the connection string (conString) for the URL that will connect to your local Postgres database.

// Windows and Linux users: You should have retained the user/password from the pre-work for this course.
// Your OS may require that your conString is composed of additional information including user and password.
const conString = 'postgres://postgres:postgres@localhost:5432/kilovolt';

// Mac:
// const conString = 'postgres://localhost:5432';


// TODO DONE: Our pg module has a Client constructor that accepts one argument: the conString we just defined.
// This is how it knows the URL and, for Windows and Linux users, our username and password for our database when client.connect() is called below. Thus, we need to pass our conString into our pg.Client() call.

const client = new pg.Client(conString);

// REVIEW: Use the client object to connect to our DB.
client.connect();


// REVIEW DONE: Install the middleware plugins so that our app can use the body-parser module.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// REVIEW DONE: Routes for requesting HTML resources
app.get('/new', (request, response) => {
    // COMMENT DONE: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // This is a request to the server from the client, #2.
    // There is no method in article.js, this GET request is the same as the client typing into the browser a https://..../ new.html.
    // The part of CRUD being enacted for the .get is R for READ. 
    response.sendFile('new.html', {root: './public'});
});


// REVIEW: Routes for making API calls to use CRUD Operations on our database
app.get('/articles', (request, response) => {
    // COMMENT DONE: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // .query is the server making a request to the database, #3.
    // The method in Article.js is the Article.fetchAll on line 32.
    // The part of CRUD that is being enacted is R for READ. 

    client.query('SELECT * FROM articles')
        .then(function(result) {
            response.send(result.rows);
        })
        .catch(function(err) {
            console.error(err);
        });
});

app.post('/articles', (request, response) => {
    // COMMENT DONE: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // client.query is represented by #3, .then is then sending the query back to the server, #4.
    // the method in article.js that interacts with this function is Article.prototype.insertRecord on line 56.
    // The part of CRUD that is being enacted is CREATE.
    client.query(
        `INSERT INTO
        articles(title, author, "authorUrl", category, "publishedOn", body)
        VALUES ($1, $2, $3, $4, $5, $6);
    `,
        [
            request.body.title,
            request.body.author,
            request.body.authorUrl,
            request.body.category,
            request.body.publishedOn,
            request.body.body
        ]
    )
        .then(function() {
            response.send('insert complete');
        })
        .catch(function(err) {
            console.error(err);
        });
});

app.put('/articles/:id', (request, response) => {
    // COMMENT DONE: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // The client.query is sending a query with a change to the database, which correspondes to #3.
    // The method interacting with this particular piece of 'server.js'is Article.prototype.updateRecord.
    // The part of CRUD being enacted is U for Update. 
    client.query(
        `UPDATE articles
        SET
        title=$1, author=$2, "authorUrl"=$3, category=$4, "publishedOn"=$5, body=$6
        WHERE article_id=$7;
    `,
        [
            request.body.title,
            request.body.author,
            request.body.authorUrl,
            request.body.category,
            request.body.publishedOn,
            request.body.body,
            request.params.id
        ]
    )
        .then(() => {
            response.send('update complete');
        })
        .catch(err => {
            console.error(err);
        });
});

app.delete('/articles/:id', (request, response) => {
    // COMMENT Done: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // client.query is sending a query to the database to delete, which corresponds to #3. And .then is receiving the delete response, which corresponds to #4. 
    // The method interacting with this particular piece of code is the Article.prototype.updateRecord.
    //The part of CRUD that is being managed by this piece of code is U for update.  
    client.query(
        `DELETE FROM articles WHERE article_id=$1;`,
        [request.params.id]
    )
        .then(() => {
            response.send('Delete complete');
        })
        .catch(err => {
            console.error(err);
        });
});

app.delete('/articles', (request, response) => {
    // COMMENT Done: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // client.query is sending a query to delete from articles to the database, which is #3. And .then is sending the result back to server, which is #4. 
    // The method of article.js that is interacting with this piece of code is Article.prototype.deleteRecord.
    // The D for Delete.
    client.query(
        'DELETE FROM articles;'
    )
        .then(() => {
            response.send('Delete complete');
        })
        .catch(err => {
            console.error(err);
        });
});

// COMMENT DONE: What is this function invocation doing?
// This function is creating the table and loading the article data into the database. 
loadDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadArticles() {
    // COMMENT DONE: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // client.query is sending a query to select all from articles, which correspondes to #3.
    // No method in article.js
    //The part of CRUD being enacted is U for update.
    client.query('SELECT COUNT(*) FROM articles')
        .then(result => {
            // REVIEW: result.rows is an array of objects that Postgres returns as a response to a query.
            // If there is nothing on the table, then result.rows[0] will be undefined, which will make count undefined. parseInt(undefined) returns NaN. !NaN evaluates to true.
            // Therefore, if there is nothing on the table, line 158 will evaluate to true and enter into the code block.
            if(!parseInt(result.rows[0].count)) {
                fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
                    JSON.parse(fd.toString()).forEach(ele => {
                        client.query(`
              INSERT INTO
              articles(title, author, "authorUrl", category, "publishedOn", body)
              VALUES ($1, $2, $3, $4, $5, $6);
            `,
                            [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, ele.body]
                        );
                    });
                });
            }
        });
}

function loadDB() {
    // COMMENT DONE: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
    // The client.query correspondes to #3.
    // No method in article.js
    // The part of CRUD being enacted is C for create. 
    client.query(`
      CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      "authorUrl" VARCHAR (255),
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL);`
    )
        .then(() => {
            loadArticles();
        })
        .catch(err => {
            console.error(err);
        });
}
