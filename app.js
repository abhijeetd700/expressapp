var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const fileUpload = require("express-fileupload");

let mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let productsRouter = require('./routes/products.js')
let hobbyRouter = require('./routes/hobby')
let forumRouter = require('./routes/forum')
let replyRouter = require('./routes/reply')
let cookieRouter = require('./routes/cookie')
let sessionRouter = require('./routes/session')
var app = express();

let mongoConnUrl = "mongodb://localhost/nodedecember21"
mongoose.connect(mongoConnUrl,{useNewUrlParser:true});
let db = mongoose.connection;

db.on('error',function(error){
  console.log('Error came in connecting'+error)
})
db.on('open',function(){
  console.log('YEs we are connected to mongodb & the database')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(fileUpload({}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret:'session_secret_key',
    resave:true,
    saveUninitialized:true,
    cookie:{
      secure:false
    }
  })
)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/hobby',hobbyRouter);
app.use('/forum',forumRouter)
app.use('/reply',replyRouter)
app.use('/cookies',cookieRouter)
app.use('/session',sessionRouter)
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