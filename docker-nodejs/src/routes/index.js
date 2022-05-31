'use strict';

const express = require('express'),
      router = express.Router(),
      user = require('./user'),
      auth = require('./auth'),
      message = require('./message');

router.use('/auth', user);
router.use('/auth', auth);
router.use('/message', message);

module.exports = router;