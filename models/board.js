const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const picSchema = new Schema({
   id: String,
   link: String,
  }, {
    timestamps: true,
});

const boardSchema = new Schema({
    name: String,
    description: String,
    contents: [picSchema],
},{
    timestamps: true
})

module.exports = mongoose.model('Board', boardSchema)