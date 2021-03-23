
function index(req, res) {
    res.render('home/index', {title: "Welcome"});
}

module.exports = {
    index,
}
