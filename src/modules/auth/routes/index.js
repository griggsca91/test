const { Router } = require('express');

const { asyncMiddleware } = require('../../../services');
const signUp = require('../controllers/signUp');
const signIn = require('../controllers/signIn');
const refresh = require('../controllers/refresh');
const { localPassport, jwtPassport } = require('../passport/middlewares');
const validations = require('../services/validations');

const router = Router();

router.post('/signup', validations.signUp, asyncMiddleware(signUp));
router.post('/signin', validations.signIn, localPassport, asyncMiddleware(signIn));
router.post('/refresh', validations.refresh, asyncMiddleware(refresh));
router.get('/ping', jwtPassport, (req, res) => {
  res.send('Pong');
});

module.exports = router;
