module.exports = (err, req, res) => {
    if (err) {
        if(!err.status) {
            err.status = 500;
        }
        res.status(err.status).json({
            message: err.message,
            stack: err.stack,
            status: err.status,
            timestamp: new Date().toUTCString(),
        });
    }
};
