module.exports = function(app) {
	app.get('/login', function(req, res) {
	  res.render('login.nunjucks', { user : req.user });
	});

	app.post('/login', function(req, res) {
	});

	app.get('/logout', function(req, res) {
    req.session
    res.redirect('/');
	});

	app.get('/ping', function(req, res){
	  res.status(200).send("pong!");
	});
};