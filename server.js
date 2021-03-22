// Require modules
const express = require('express');
const morgan = require('morgan');
const session = require('express-session')
const port = 3000; 
const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const dashRouter = require('./routes/dashboard')


// Set up express app
const app = express();

// Connect to DB
require('./config/database')

// Configure the app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

// Mount routes with app.use()
app.use('/', indexRouter);
app.use("/home", homeRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashRouter)

// Tell App to listen
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`);
});
