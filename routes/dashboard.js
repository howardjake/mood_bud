const express = require('express');
const router = express.Router();
const dashCtrl = require('../controllers/dashboard');

router.get('/', dashCtrl.index);
router.get('/logout', dashCtrl.logout);

router.get('/new', dashCtrl.new);
router.post('/', dashCtrl.create)

router.get('/:id', dashCtrl.show)

module.exports = router;
