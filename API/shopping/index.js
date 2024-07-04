//config dotenv library
require('dotenv').config();

//import util  getDbConnection
// const util = require('./util');

//this is express
const express = require('express');

//this is middelware
const reqlogger = require('./middleware/Requestlogger');

const app = express();
app.use(reqlogger);

// for API
app.use("/api", require('./controller/Api'));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is starting at ${process.env.APP_PORT}`);
});