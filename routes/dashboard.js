const express = require('express');
const router = express.Router();
const dashCtrl = require('../controllers/dashboard');

router.get('/', dashCtrl.index);
router.get('/logout', dashCtrl.logout);

router.get('/new', dashCtrl.new);
router.post('/', dashCtrl.create);

router.get('/:id', dashCtrl.show);
router.delete('/:id', dashCtrl.deleteOne);

router.get('/:id/edit', dashCtrl.edit);
router.put('/:id', dashCtrl.update);

module.exports = router;
