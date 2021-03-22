const express = require('express');
const router = express.Router();
const dashCtrl = require('../controllers/dashboard');

router.get('/', dashCtrl.index);
router.get('/logout', dashCtrl.logout);




module.exports = router;
