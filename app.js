var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var app = express();

app.set('view engine', 'nunjucks');
var nEnv = nunjucks.configure('templates', {
    autoescape: false,
    noCache: true,
    express: app
});

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.locals.base_url = "https://guarded-peak-3877.herokuapp.com";

app.locals.isLoggedIn = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.locals.isNotLoggedIn = function(req, res, next) {
  if (!req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

require('./routes/index.js')(app);
require('./routes/account.js')(app);

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});