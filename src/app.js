const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const config = require('./config');
const { localStrategy, jwtStrategy } = require('./modules/auth/passport/strategies');
const v1Router = require('./routes/v1');
const { errorsConverter, errorsNotFound } = require('./services/errors');

const app = express();

if (config.isDev) {
  app.use(cors());
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(`${config.API_PREFIX}/v1`, v1Router);

app.use(errorsNotFound);
app.use(errorsConverter);

module.exports = app;
