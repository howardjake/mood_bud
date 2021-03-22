const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/new_user', usersCtrl.new);
router.post('/signup', usersCtrl.signup);

router.get('/signin', usersCtrl.signin);
router.post('/login', usersCtrl.login)

router.get('/logout', usersCtrl.logout)

module.exports = router;
