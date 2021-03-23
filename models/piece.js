const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieceSchema = new Schema({
    kind: String,
    title: String,
    notes: String,
},{
    timestamps: true
})

module.exports = mongoose.model('User', pieceSchema)