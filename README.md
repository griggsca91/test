# express-mongodb-boilerplate

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Start development](#start-development)
- [Start in production](#start-in-production)
- [Lint](#lint)

## Overview

This is a starter project for building REST API using modular structure, Node.js(Express.js), MongoDB (Mongoose) and ES6. For Authentication uses Passport JWT strategy.

## Features

- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/) database using [Mongoose](https://mongoosejs.com/)
- ES6 support using [Babel](https://babeljs.io/)
- Code Linting using [ESLint](https://eslint.org/)
- Authentication and Authorization using [Passport](http://www.passportjs.org) and [Passport JWT strategy](http://www.passportjs.org/packages/passport-jwt/)
- Auto restart the server using [nodemon](https://nodemon.io/)
- Request's compression using [compression](https://github.com/expressjs/compression)
- Monitoring in production using [pm2](http://pm2.keymetrics.io/)

## Getting Started

Clone the repository and delete existed `.git`:

```sh
git clone git@github.com:fedoryakubovich/express-mongodb-boilerplate.git
cd express-mongodb-boilerplate
rm -rf .git
```

Install dependencies:

```sh
npm install
```

## Start Development

```sh
npm start
```

## Start in production

`express-mongodb-boilerplate` uses [pm2](http://pm2.keymetrics.io/). PM2 is a daemon process manager that will help you manage and keep your application online.

Install PM2:

```sh
npm install pm2@latest -g
```

Build the project and start pm2:

```sh
npm run build
pm2 start pm2.config.json
```

## Lint

Lint code with ESLint:

```sh
npm run lint
```
