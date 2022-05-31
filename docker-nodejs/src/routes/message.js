'use strict';

const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController'),
      messageController = require('../controllers/messageController'),
      { messageValidator } = require('../middleware/messageValidator');

router.get(
  '/new',
  userController.isAuthenticated,
  messageController.new
);

router.post(
  '/:id/postMessage',
  userController.isAuthenticated,
  messageValidator(),
  messageController.validate, 
  messageController.postMessage
);

router.get(
  '/:id/edit',
  userController.isAuthenticated,
  messageController.edit
);

router.post(
  '/:id/editMessage',
  userController.isAuthenticated,
  messageValidator(),
  messageController.validate,
  messageController.editMessage
);

router.post(
  '/:id/delete',
  userController.isAuthenticated,
  messageController.delete
);

module.exports = router;