'use strict';

const User = require('../models').User,
      Message = require('../models').Message,
      passport = require('passport'),
      { validationResult } = require('express-validator');

module.exports = {
  login: (req, res) => {
    res.render('auth/login')
  },

  loginAuthenticate: passport.authenticate('login', {
    failureFlash: true,
    failureRedirect: '/auth/login',
    successFlash: true,
    successRedirect: '/auth/dashboard'
  }),

  register: (req, res) => {
    res.render('auth/register');
  },

  validate: (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      req.flash('error', errorMessages);
      res.redirect('/auth/register');
    } else {
      next();
    }
  },

  registerAuthenticate: passport.authenticate('register', {
    failureFlash: true,
    failureRedirect: '/auth/register',
    successFlash: true,
    successRedirect: '/auth/dashboard'
  }),

  isAuthenticated: (req, res, next) => {
    if(req.isAuthenticated()) {
      next();
    } else {
      req.flash('error', "ログインしてください。");
      res.redirect('/auth/login');
    }
  },

  findAllUsers: (req, res, next) => {
    User.findAll()
      .then(users => {
        const usersJson = JSON.stringify(users);
        res.locals.users = JSON.parse(usersJson);
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  findAllMessages: (req, res, next) => {
    Message.findAll()
      .then(messages => {
        const messagesJson = JSON.stringify(messages);
        res.locals.messages = JSON.parse(messagesJson);
        next();
      })
      .catch(error => {
        console.log(`Error fetching messages: ${error.message}`);
        next(error);
      });
  },

  shapingData: (req, res, next) => {
    const users = res.locals.users,
          messages = res.locals.messages;
    const authors = users.map(user => {
      return user;
    });
    const postMessages = messages.map(message => {
      return message;
    });
    res.locals.authors = authors;
    res.locals.postMessages = postMessages
    next();
  },

  dashboard: (req, res) => {
    res.render('dashboard');
  },

  logout: (req, res, next) => {
    req.logout();
    req.flash('success', "ログアウトしました。");
    res.redirect('/auth/login');
  }
};