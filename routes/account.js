var unirest = require('unirest');

module.exports = function(app) {
	app.get('/login', function(req, res) {
	  res.render('login.nunjucks', { user : req.session.user });
	});

	app.post('/login', function(req, res) {
		console.log(req.body.username);
		console.log(req.body.password);

		unirest.get(app.locals.base_url + "/token").auth({
			user: req.body.username,
			pass: req.body.password
		}).end(function (response) {
		  if (response.code == 200) {
		  	req.session.user = {token: response.body.token, 
		  		user: req.body.username, 
		  		password: req.body.password, 
		  		authHeader: 'Basic ' + new Buffer(req.body.username + ':' + req.body.password).toString('base64')};
		  	res.redirect('/');
		  } else {
		  	res.send(response.body);
		  }
		});
	});

	app.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
	});

	app.get('/ping', function(req, res){
	  res.status(200).send("pong!");
	});
};