module.exports = (err, req, res, next) => {
    if (err) {
        if(!err.status) {
            err.status = 500;
        }
        res.status(err.status).json({
            message: err.message,
            status: err.status,
            timestamp: new Date().toUTCString(),
            stack: err.stack,
        });
    }
    next();
};
