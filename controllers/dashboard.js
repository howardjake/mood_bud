const User = require("../models/user");

function index(req, res) {
    console.log(req.session)
    if(req.session.userId) {
        User.findById(req.session.userId, function(err, foundUser){
            res.render('dashboard/index', {title: "Dashboard", foundUser}
            )
        })
    } else {
        res.redirect('/users/signin')
    }
}

function logout(req, res) {
    req.session.destroy(function(err){
        console.log(req.session)
        res.redirect('/')
    });
}

module.exports = {
    index,
    logout,
}
