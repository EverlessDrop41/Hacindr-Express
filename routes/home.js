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
}
