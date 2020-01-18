const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const passport = require('passport');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const config = require('./config');
const { localStrategy, jwtStrategy } = require('./modules/auth/passport/strategies');
const { dbConnect } = require('./database');
const { serverOnError, errorsHandler, errorsNotFound } = require('./services/errors');
const v1Router = require('./routes/v1');

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
app.use(errorsHandler);

const server = http.createServer(app);

server.listen(config.PORT, async () => {
  await dbConnect();
  /* eslint-disable no-console */
  console.log(`Server is running on http://localhost:${config.PORT}`);
  /* eslint-disable no-console */
});

server.on('error', serverOnError);
