require('pexels');
const axios = require('axios');
const { query } = require('express');
const Board = require("../models/board");
const dashboard = require('./dashboard');
const BASE_URL = 'https://api.pexels.com/v1/';
const isImageUrl = require('is-image-url');

function newPiece(req, res) {
    console.log(req.body)
    console.log(req.session)
    axios.get(BASE_URL + `curated?per_page=20`, {
        headers: {
            'Authorization': `5${process.env.PEXEL_AUTH}d`
          }
        })
        .then(function(response){
        all = response.data.photos
        res.render('pieces/new', { title: 'Express', photos: response.data, search: req.body, every: all, current: req.session.currentBoard});
      });
}


function create(req, res) {
  Board.findById(req.params.id, function (err, board) {
    board.contents.push(req.body);
    board.save(function (err) {
      res.redirect(`/dashboard/`);
    });
  });
}

let all = []

function lookup(req, res, next) {
    let page = req.body.page 
    axios.get(BASE_URL + `search?query=${req.body.pics}&per_page=20&page=${page}`, {
        headers: {
          'Authorization': `5${process.env.PEXEL_AUTH}d`
        }
      })
      .then(function(response){
          console.log(response)
      all = response.data.photos
      res.render('pieces/search', { title: 'Express', photos: response.data, search: req.body, every: all});
    });
};

function more(req, res) {
    console.log(req.body)
    let page = req.body.page;
    let current = page
        axios.get(BASE_URL + `search?query=${req.body.pics}&per_page=20&page=${current}`, {
            headers: {
              'Authorization': `5${process.env.PEXEL_AUTH}d`
            }
          })
          .then(function(response){
          response.data.photos.forEach(function(photo) {
              all.push(photo)
          });
          res.render('pieces/search', { title: 'Express', photos: response.data, search: req.body, every: all});
        });
    
}

function show(req, res) {
    console.log(req.session)
    axios.get(BASE_URL + "photos/" + req.params.id, {
        headers: {
            'Authorization': `5${process.env.PEXEL_AUTH}d`
        }
    })
    .then(function(response) {
        res.render('pieces/show', {title: req.params.id, photo: response, current: req.session.currentBoard})
    })
}

function addPiece (req, res) {
    let isIt = isImageUrl(req.body.link)
    console.log(isIt)
    if (!currentBoard) {
        Board.findById(req.session.currentBoard, function(err, board) {
            board.contents.push(req.body.photo)
            board.save(function (err) {
                res.redirect(`/dashboard/${req.session.currentBoard}/`);
            });
            console.log(board)  
        })
        } else {
   res.redirect('/dashboard')
}
} 

function removeOne (req, res) {
    console.log(req.body)
    Board.findById(req.params.id, function(err, board) {
        board.contents.splice(req.body.idx, 1);
        board.save(function(err) {
            res.redirect(`/dashboard/${req.params.id}`)
        })
    })
}

module.exports = {
  create,
  new: newPiece,
  lookup,
  more,
  show,
  addPiece,
  removeOne
};