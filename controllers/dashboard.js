const { populate } = require('../models/board');
const Board = require('../models/board');
const user = require('../models/user');
const User = require("../models/user");

function index(req, res) {
    console.log(req.session)
    if(req.session.userId) {
        User.findById(req.session.userId).populate('boards').exec(function(err, foundUser){
            Board.find({_id: {$nin: user.boards}},
                function(err, boards){
                    console.log(boards)
                    res.render('dashboard/index', {title: "Dashboard", foundUser});
                });
        });
    } else {
        res.redirect('/users/signin')
    }
}

function logout(req, res) {
    req.session.destroy(function(err){
        res.redirect('/')
    });
}

function newBoard (req, res) {
    res.render('dashboard/new', {title: "New Board"})
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === "") delete req.body[key];
      }

    let newBoard
    Board.create(req.body, function (err, board) { 
        newBoard = board._id
        User.findById(req.session.userId, function(err, user) {
            user.boards.push(newBoard);
            user.save(function(err){
                res.redirect('/dashboard');
            })
          })
        })
}


function show(req, res) {
    if(req.session.userId) {
        Board.findById(req.params._id, function(err, board) {
            res.render('dashboard/show', {title: ''})
        })
    } else {
        res.redirect('/users/signin')
    }
}

module.exports = {
    index,
    logout,
    new: newBoard,
    create,
    show
}
