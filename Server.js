//  imports
require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/adminOnly'));
app.use('/api/aidagency', require('./routes/aidagency'));
app.use('/api/user', require('./routes/users'));
// const logger = require('./utils/logger');
// // const routeManager = require('./routes/api');
// const { AppError, ERR } = require('./utils/error');

// Add headers
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'access_token,refresh_token,X-Requested-With,content-type'
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });


// global.AppError = AppError;
// const limiter = rateLimit({
//   windowMs: 1000, // 15 minutes
//   max: 5, // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);

//logger and security
// app.use(morgan('dev'));
// app.use(helmet({ contentSecurityPolicy: false }));
// app.use(compression());

//payload handlers
// app.use(express.urlencoded({ extended: true }));

// API ROUTES
// app.use('/api', routeManager);

// app.use((req, res, next) => {
//   const err = new AppError('Method not allowed', 404);
//   next(err);
// });

// app.use((err, req, res, next) => {
//   if (!err.isOperational) {
//     logger.error(err.stack);
//   }
//   if (typeof err === 'string') {
//     err = {
//       message: err,
//       statusCode: 500,
//       status: 'fail',
//     };
//   }
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   res.status(err.statusCode).json({
//     status: err.status,
//     statusCode: err?.statusCode || 500,
//     message: err.error || err.message,
//   });
//   res.end();
// });

// Error handler should be last piece of middleware
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

// Handle crashed
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
