const login = require('express').Router();
const bodyParser = require('body-parser');
const db = require('./../../db.js');
const session = require('express-session');
const _ = require('underscore');

login.use(bodyParser.urlencoded({extended: true}));

login.post('/userCreated', function(req, res) {
  var body = _.pick(req.body, 'username', 'password');
   db.user.create(body).then(function(user) {
       res.json(user.toPublicJSON());
   }, function(e) {
       res.status(404).json(e);
   })
})

login.post('/admin.php', function(req, res) {
  var body = _.pick(req.body, 'username', 'password');
 	db.user.authhenticate(body).then(function (user) {
    if(user) {
      req.session.logged = true;
      req.session.user = {
 			    username : user.username
      }
      res.redirect('/admin');
    }
 	}, function (e) {
 			res.status(401).send('The auth failed');
    });
});


login.get('/', function(req, res) {
  res.render('login');
})


module.exports = login;
