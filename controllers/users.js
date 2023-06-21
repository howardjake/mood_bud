const User = require('../models/user');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

function newUser(req, res) {
    res.render('users/new_user', {title: 'Signup'});
}

function signup(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    User.create(req.body, function(err, newUser) {
        res.redirect('/');
    })
}

function signin(req, res) {
    res.render('users/login', {title: 'Login'});
}

function login(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, foundUser) {
        if (!foundUser) {
            res.redirect('/users/signin');
        } else {
            const passwordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if (passwordMatch) {
                req.session.userId = foundUser._id;
                res.redirect('/dashboard');
            } else {
                res.redirect('/signin', {title: 'Login'});
            }
        }
    });
}

function logout(req, res) {
    req.session.destroy();
    res.redirect('/')
}

module.exports = {
    new: newUser,
    signup,
    signin,
    login,
    logout
} 