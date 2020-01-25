const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongosSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');

const app = express();

////////////////////////// DEVELOPMENT SETTINGS //////////////////////////

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

////////////////////////// GLOBAL MIDDLEWARES //////////////////////////

// cors
app.use(cors());
// set security HTTP headers
app.use(helmet());
// limit repeated requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in a hour'
});
app.use('/api', limiter);
// against NoSql injections
app.use(mongosSanitize());
// against XSS
app.use(xss());
// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'difficulty',
      'maxGroupSize',
      'price'
    ]
  })
);
// reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
// seving static files
app.use(express.static(`${__dirname}/public`));

////////////////////////// APP's ROUTES //////////////////////////

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/reviews', require('./routes/reviewRoutes'));

////////////////////////// NOT PROCESSED ROUTES //////////////////////////

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

////////////////////////// GLOBAL ERROR HANDLER //////////////////////////

app.use(require('./controllers/errorController'));

module.exports = app;
