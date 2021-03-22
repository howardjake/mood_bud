const mongoose = require('mongoose');
const { connect } = require('../routes');
require('dotenv').config()

const USER = process.env.DB_USER
const PASS = process.env.DB_PASS


// shortcut to mongoose.connection object
const db = mongoose.connection;

mongoose.connect(`mongodb+srv://${USER}:${PASS}@cluster0.txpol.mongodb.net/mood_bud?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


db.on('connected', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
