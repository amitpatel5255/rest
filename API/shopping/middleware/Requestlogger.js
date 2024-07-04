// request handlling  funcation

const Requestlogger = (req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).end();
    } else {
        console.log(`URL Called ${req.method}`);
        next();
    }
};

// Export the function
module.exports = Requestlogger;