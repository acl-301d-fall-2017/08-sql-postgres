Lab 08: SQL and PostgreSQL
===

## Content
1. Submission Instructions
1. Resources
1. Configuration
1. User Stories and Feature Tasks

----

## Submission Instructions
Follow the submission instructions outlined in our [submit-process repo](https://github.com/acl-301d-fall-2017/submit-process).

## Resources  
[SQL Syntax Cheatsheet](cheatsheets/sql.md)

[PostgreSQL Shell Cheatsheet](cheatsheets/postgress-shell.md)

[PostgreSQL Docs](https://www.postgresql.org/docs/)

## Configuration
_Your repository must include:_

```
08-sql-intro-and-postgres
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── data
│   │   └── hackerIpsum.json
│   ├── index.html
│   ├── new.html
│   ├── scripts
│   │   ├── article.js
│   │   └── articleView.js
│   ├── styles
│   │   ├── base.css
│   │   ├── fonts
│   │   │   ├── icomoon.eot
│   │   │   ├── icomoon.svg
│   │   │   ├── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   ├── icons.css
│   │   ├── layout.css
│   │   └── modules.css
│   └── vendor
│       └── styles
│           ├── default.css
│           ├── normalize.css
│           └── railscasts.css
└── server.js
```

## User Stories and Feature Tasks

*As a user, I want to store my articles in a database so that my articles are available for users from an external source.*

- Install and require the NPM Postgres package `pg` in your server.js file. Make sure to complete the connection string.
- Note that the articleView.js methods are different now that we are not accessing the JSON file directly, and instead retrieving the articles from a database.

*As a developer, I want to review my code base so that I have a deep understanding of its overall functionality.*

-  Complete the TODO items in server.js to ensure that your server file is properly configured
- Study each of the new routes in your server.js file by examining the SQL statements and any associated data being handed through the request.
- For each of the COMMENT items in server.js, provide a brief description of what that function immediately below is doing. Be sure to indicate, where applicable, details such as:
  - What number(s) of the full-stack-diagram.png image is this part of the code interacting with?
  - Which method of article.js is interacting with this particular piece of server.js?
  - What part of ***CRUD*** is being enacted/managed by this particular piece of code?
  - As applicable, an additional sentence or two of explanation about what the code is doing, what NPM packages are involved, etc. The goal is to demonstrate that you understand what is going on in the code without glossing over details, but also without writing a novel about it.