const config = require("config");
const jwt = require("jsonwebtoken");

// For Admin based private route
function userAuth(req, res, next) {
  const token = req.header("");
}
