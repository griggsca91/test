const express = require('express');

const authRoutes = require('../../modules/auth/routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.get('/ping', (req, res) => {
  res.send('Pong');
});

module.exports = router;
