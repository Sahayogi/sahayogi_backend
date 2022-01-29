class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const ERR = {
    DEFAULT: new AppError("Error Occured", 500),
    AUTH_FAIL: new AppError("Authentication failed. Please try again.", 401),
    DATE_FUTURE: new AppError("Date is in future", 400),
    PWD_SAME: new AppError("Please send different new password", 400),
    PWD_NOTMATCH: new AppError("Old password does not match.", 400),
    TOKON_REQ: new AppError("Must send access_token", 400),
    USER_NOEXISTS: new AppError("User does not exists", 400),
    INVALID_ACCESS_TOKEN: new AppError("access_token is invalid", 400),
    INVALID_REFRESH_TOKEN: new AppError("refresh_token is invalid", 400),
    REFRESH_TOKEN_REQ: new AppError("Must send refresh_token", 400),
    INVALID_USERID: new AppError("Invalid user id", 400),
    MISSING_ARG: new AppError("Missing argument."),
    FOREIGN_REF: new AppError("Foreign key reference error."),
    NOT_FOUND: new AppError("Data not found", 404),
    ALREADY_EXISTS: new AppError("Data already exists", 400),
    ERROR_SAVING_DB: new AppError("Error saving to database", 400),
    BAD_REQUEST: new AppError("Bad Request", 400),
};

const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

const throwError = err => {
    throw err;
};

module.exports = { AppError, ERR, throwError, catchAsync };