var createError = require('http-errors');
var express = require('express');
const cors = require('cors'); // 1. Import the package
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const DistrictRouter = require('./routes/village-master.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 2. Configure CORS options
const corsOptions = {
    origin: '*', // Allow your All origin
    // origin: 'http://localhost:4202', // Allow your Angular app origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
    credentials: true // Allow cookies/tokens if needed
};

// app.use(cors(corsOptions)); // 3. Apply CORS middleware globally
app.use(cors()); // 3. Apply CORS middleware globally

app.use(express.json());

app.use('/', indexRouter);
app.use('/admin', usersRouter);
app.use('/public/district', DistrictRouter);
// 
// router.get('/district', DistrictRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;