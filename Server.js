//  imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const helmet = require ('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');



const logger = require('./utils/logger');
const routeManager = require('./routes/api')
const { AppError, ERR} = require('./utils/error')
// require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'access_token,refresh_token,X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(cors());
global.AppError = AppError;
const limiter = rateLimit({
  windowMs: 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

//logger and security
app.use(morgan('dev'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

//payload handlers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongodb atlas server config
const uri = config.get("ATLAS_URI");
mongoose.connect(uri, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection extablished successfully");
});

// API ROUTES
app.use('/api', routeManager);

app.use((req, res, next) => {
  const err = new AppError('Method not allowed', 404);
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.isOperational) {
    logger.error(err.stack);
  }
  if (typeof err === 'string') {
    err = {
      message: err,
      statusCode: 500,
      status: 'fail',
    };
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err?.statusCode || 500,
    message: err.error || err.message,
  });
  res.end();
});



// Routing
// const vendorRouter = require("./routes/vendor");
// const projectsRouter = require("./routes/projects");
// const aidAgencyRouter = require("./routes/aidAgency");
// const beneficiaryRouter = require("./routes/beneficiary");
// const transactRouter = require("./routes/transaction");
// app.use("/vendor", vendorRouter);
// app.use("/aidAgency", aidAgencyRouter);
// app.use("/beneficiary", beneficiaryRouter);
// app.use("/project", projectsRouter);
// app.use("/transacttion", transactRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
