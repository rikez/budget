const routes = require('express').Router();
const login = require('./login');
const admin = require('./admin');
const session = require('express-session');
const middleware = require('./middleware.js');



routes.use('/admin', admin);
routes.use('/admin/logout', admin);
routes.use('/login/admin.php',  login);
routes.use('/login', login);

routes.get('/', (req, res) => {
  res.status(200).json('Olá')
});

module.exports = routes;
