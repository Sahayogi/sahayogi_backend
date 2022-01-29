//  imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

// require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// API ROUTES
const usersRouter = require("./routes/api/user");
const loginRouter = require("./routes/api/loginAuth");
//  Use Routes
app.use("/api/user", usersRouter);
app.use("/api/login", loginRouter);
// mongodb atlas server config
const uri = config.get("ATLAS_URI");
mongoose.connect(uri, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection extablished successfully");
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
