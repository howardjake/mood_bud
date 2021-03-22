const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    boards: [{type: Schema.Types.ObjectId, ref: "Board"}]
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)