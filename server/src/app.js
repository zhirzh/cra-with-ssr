import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import { BUILD_DIR, PUBLIC_DIR } from './paths';
import reactRenderer from './react-renderer';

const app = express();

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


const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log('Server listening on:', port);
});
