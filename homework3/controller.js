exports.home = function(req, res) {
  res.sendFile('views/home.html', {root: __dirname })
}