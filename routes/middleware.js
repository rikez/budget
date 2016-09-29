module.exports = function() {
  return {
        auth: function(req, res, next) {
        console.log(req.url);
        if (req.url == '/admin') {
            next();
        } else {
            if (req.session.logged) {
                next();
            } else {
                res.render('login');
            }
        }
      }
  }
}
