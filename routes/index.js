const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.redirect('/home');
  });
  
module.exports = router;
