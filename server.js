const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db.js');
const PORT = process.env.PORT || 4000;
const routes = require('./routes');
const session = require('express-session');

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'AWFghjUI01#',
    cookie: {
        maxAge: 150000,
        httpOnly: true
    }
}));

app.use('/', routes);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
      console.log('Server is running');
  });
})
