const router = require('express').Router();

const usersRouter = require("./user")
const loginRouter = require("./loginAuth")

router.use("/user", usersRouter);
router.use("/login",loginRouter);

module.exports = router ;