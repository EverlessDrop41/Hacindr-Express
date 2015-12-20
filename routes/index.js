module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.nunjucks', {user: req.user});
  });
}
