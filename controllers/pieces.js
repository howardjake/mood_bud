require('pexels');
const axios = require('axios');
const { query } = require('express');
const Board = require("../models/board");

function newPiece(req, res) {
    axios.get(BASE_URL + `curated?per_page=15`, {
    headers: {
      'Authorization': `5${process.env.PEXEL_AUTH}d`
    }
  })
  .then(function(response){
//   console.log(response);
    res.render('pieces/new', { title: 'Add', photos: response.data });
    });
}

const BASE_URL = 'https://api.pexels.com/v1/' 

function create(req, res) {
  Board.findById(req.params.id, function (err, board) {
    board.contents.push(req.body);
    board.save(function (err) {
      res.redirect(`/dashboard/${movie._id}`);
    });
  });
}

let all = []

function lookup(req, res, next) {
    console.log(req.body)
    let page = req.body.page 
    axios.get(BASE_URL + `search?query=${req.body.pics}&per_page=20&page=${page}`, {
        headers: {
          'Authorization': `5${process.env.PEXEL_AUTH}d`
        }
      })
      .then(function(response){
      all = response.data.photos
      console.log(all)
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

module.exports = {
  create,
  new: newPiece,
  lookup,
  more
};