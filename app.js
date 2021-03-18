const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

const routes = require('./routes');
const db_config = require('./config/db')

const app = express();

mongoose.connect(`mongodb://${db_config.host}:${db_config.port}/${db_config.dbname}`, db_config.options);
mongoose.connection.on('error', error => console.log(error) );
// mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"c8fvuc^CXs8f7w7TFXufw"}));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

const attachDB = (req, res, next)=>{
    req.db = mongoose.connection;
    next()
}
app.use(attachDB);
app.all('/*', routes);

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
