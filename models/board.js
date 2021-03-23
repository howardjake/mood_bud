const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: String,
    description: String,
    contents: [[{type: Schema.Types.ObjectId, ref: "Piece"}]]
},{
    timestamps: true
})

module.exports = mongoose.model('Board', boardSchema)