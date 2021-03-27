const { default: axios } = require('axios');
const { populate } = require('../models/board');
const board = require('../models/board');
const Board = require('../models/board');
const user = require('../models/user');
const User = require("../models/user");
const BASE_URL = 'https://api.pexels.com/v1/' 

function index(req, res) {
    console.log(req.session)
    if(req.session.userId) {
        User.findById(req.session.userId).populate('boards').exec(function(err, foundUser){
            Board.find({_id: {$nin: user.boards}},
                function(err, boards){
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
        Board.findById(req.params.id, function(err, board) {
                req.session.currentBoard = req.params.id
                res.render('dashboard/show', {title: "", board})
        })
    } else {
        res.redirect('/users/signin')
    }
}

function deleteOne(req, res) {
        Board.findByIdAndDelete(req.params.id, function(err) {
                res.redirect('/dashboard')
            })
        
}

function edit(req, res) {
    if(req.session.userId) {
        Board.findById(req.params.id, function(err, board) {
                req.session.currentBoard = req.params.id
                res.render('dashboard/edit', {title: "", board})
        })
    } else {
        res.redirect('/users/signin')
    }
}

function update(req, res) {
    if(req.session.userId) {
        Board.findById(req.params.id, function(err, board) {
            board.name = req.body.name;
            board.description = req.body.description
            board.save(function(err){
                res.redirect(`/dashboard/${ req.session.currentBoard }`)
            })
        });
    } else {
        res.redirect('/users/signin')
    }
}

module.exports = {
    index,
    logout,
    new: newBoard,
    create,
    show,
    deleteOne,
    edit,
    update
}
