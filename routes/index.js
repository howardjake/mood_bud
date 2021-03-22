const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/index');

router.get('/', function(req, res, next) {
    res.redirect('/home');
  });
  
module.exports = router;
