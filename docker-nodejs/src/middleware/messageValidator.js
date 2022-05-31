'use strict';

const { check } = require('express-validator');

const messageValidator = (req, res) => {
  return [
    check('title')
      .notEmpty()
      .withMessage('タイトルを入力してください。')
      .isLength({ max: 10 })
      .withMessage('タイトルは10文字以内で入力してください。'),
    check('contents')
      .notEmpty()
      .withMessage('コンテンツを入力してください。')
      .isLength({ max: 140 })
      .withMessage('コンテンツは140文字以内で入力してください。')
  ]
}

module.exports = { messageValidator };