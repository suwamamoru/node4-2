'use strict';

const Message = require('../models').Message,
      { validationResult } = require('express-validator');

module.exports = {
  new: (req, res) => {
    res.render('message/new', {
      currentUser: res.locals.currentUser
    });
  },

  validate: (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      req.flash('error', errorMessages);
      if (req.originalUrl.indexOf('editMessage') !== -1) {
        res.redirect(`/message/${req.params.id}/edit`);
      } else if (req.originalUrl.indexOf('postMessage') !== -1) {
        res.redirect('/message/new');
      }
    } else {
      next();
    }
  },

  postMessage: (req, res) => {
    Message.create({
      userId: req.params.id,
      title: req.body.title,
      contents: req.body.contents
    })
      .then(() => {
        req.flash('success', '新しいメッセージを投稿しました。');
        res.redirect('/auth/dashboard');
      })
      .catch(error => {
        console.log(error);
      })
  },

  edit: (req, res) => {
    const id = req.params.id;
    Message.findByPk(id)
      .then(message => {
        const messageJson = JSON.stringify(message),
          editMessage = JSON.parse(messageJson);
        res.render('message/edit', {
          id: editMessage.id,
          title: editMessage.title,
          contents: editMessage.contents
        });
      })
      .catch(error => {
        console.log(error);
      })
  },

  editMessage: (req, res) => {
    const id = req.params.id;
    Message.findByPk(id)
      .then(message => {
        message.title = req.body.title
        message.contents = req.body.contents
        message.save()
        req.flash('success', 'メッセージを編集しました。');
        res.redirect('/auth/dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Message.findByPk(id)
      .then(message => {
        message.destroy();
        res.redirect('/auth/dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  }
};