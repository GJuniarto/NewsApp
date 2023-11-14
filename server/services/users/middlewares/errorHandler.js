function errorHandler(err, req, res, next) {
    let status = 500;
    let message = "Internal Server Error";

    if (err.name === "Email is required!" || err.name === "Password is required!") {
        status = 400;
        message = err.name;
    } else if (err.name === "Email is registered!") {
        status = 401;
        message = err.name;
    }
    console.log(err);
    res.status(status).json({ message });
}

module.exports = errorHandler;
