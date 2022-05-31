'use strict';


const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController'),
      { registerValidator } = require('../middleware/registerValidator');

router.get('/login', userController.login);
router.post('/login', userController.loginAuthenticate);
router.get('/register', userController.register);
router.post(
  '/register',
  registerValidator(),
  userController.validate,
  userController.registerAuthenticate
);
router.get(
  '/dashboard',
  userController.isAuthenticated,
  userController.findAllUsers,
  userController.findAllMessages,
  userController.shapingData,
  userController.dashboard
);
router.post('/logout', userController.logout);

module.exports = router;