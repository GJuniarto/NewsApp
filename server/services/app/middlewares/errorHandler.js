function errorHandler(err, req, res, next) {
    let status = 500;
    let error = "Internal Server Error";
    if (err.name === "SequelizeValidationError") {
        status = 400;
        error = err.errors[0].message;
    } else if (err.name === "SequelizeUniqueConstraintError") {
        status = 400;
        error = "Email is already exist";
    } else if (err.name === "email_password") {
        status = 401;
        error = "Email/Password is wrong!";
    } else if (err.name === "JsonWebTokenError" || err.name === "unauthorized") {
        status = 401;
        error = "Invalid Token!";
    }
    console.log(err);
    res.status(status).json({ message: error });
}

module.exports = errorHandler;
