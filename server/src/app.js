var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var { BUILD_DIR, PUBLIC_DIR } = require('./paths');
var reactRenderer = require('./react-renderer');

var app = express();

app.use(logger('dev'));

app.use(reactRenderer);

app.use(express.static(BUILD_DIR));
app.use(express.static(PUBLIC_DIR));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  throw err;
});


var port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log('Server listening on:', port);
});
