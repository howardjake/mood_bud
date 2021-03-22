const mongoose = require('mongoose');

const connectionURI = 'mongodb+srv://Admin:Kp2402@cluster0.txpol.mongodb.net/mood_bud?retryWrites=true&w=majority'

// shortcut to mongoose.connection object
const db = mongoose.connection;

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


db.on('connected', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});