const express = require("express");
const router = express.Router();
const piecesCtrl = require("../controllers/pieces");

router.post("/dashboard/:id/pieces", piecesCtrl.create);
router.get("/pieces/new", piecesCtrl.new);
router.post("/pieces/search", piecesCtrl.lookup);
router.post("/pieces/more", piecesCtrl.more);
router.get('/pieces/:id', piecesCtrl.show)
router.post('/dashboard/:id/pieces', piecesCtrl.addPiece)

module.exports = router;