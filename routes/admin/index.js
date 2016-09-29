const admin = require('express').Router();
const db = require('../../db.js');
const express = require('express');
const app = express();
const _ = require('underscore');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

admin.get('/', function (req, res) {
  if(!req.session.logged) {
      res.redirect('/login');
  } else {
    res.render('admin', {
      user: req.session.user
    });
  }
});

admin.get('/logout', function (req, res) {
  req.session.destroy(function(err){
    if(err) {
      res.send(err);
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    }
  });
});




module.exports = admin;
