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

  app.get('/vote/:id/:value', app.locals.isLoggedIn, function(req, res) {
  	unirest.post(app.locals.base_url + "/ideas/vote").header({
			Authorization: req.session.user.authHeader
		}).send({
  		idea: req.params.id,
  		vote: req.params.value
  	}).end(function (response) {
		  console.log(response.body);
		  res.redirect("/queue");
		});
  });

  app.post('/create_post', app.locals.isLoggedIn, function (req, res) {
  	unirest.post(app.locals.base_url + "/ideas/add").header({
			Authorization: req.session.user.authHeader
		}).send({
  		title: req.body.title,
  		content: req.body.content
  	}).end(function (response) {
		  console.log(response.body);
		  res.redirect("/home");
		});
  })
}
