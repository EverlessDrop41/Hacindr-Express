var unirest = require('unirest');

module.exports = function (app) {
  app.get('/home', app.locals.isLoggedIn, function (req, res) {
    res.render('home.nunjucks', {user: req.session.user});
  });

  app.get('/popular', app.locals.isLoggedIn, function(req, res) {

  	console.log({
			user: req.session.user.user,
			pass: req.session.user.password
		});

  	unirest.get(app.locals.base_url + "/ideas/top").header({
			Authorization: req.session.user.authHeader
		}).end(function (response) {
			res.render('popular.nunjucks', {user: req.session.user, ideas: response.body.ideas})
		  //res.send(response.body);
		});
  });

  app.get('/queue', app.locals.isLoggedIn, function(req, res) {
  	unirest.get(app.locals.base_url + "/ideas/next").header({
			Authorization: req.session.user.authHeader
		}).end(function (response) {
			res.render('idea.nunjucks', {user: req.session.user, idea: response.body.idea});
		  //res.send(response.body);
		});
  });

  app.post('/vote/:id/:value', app.locals.isLoggedIn, function(req, res) {
  	res.send("Voting on the idea with an id of " + req.params.id + " and a value of " + req.params.value);
  });
}
