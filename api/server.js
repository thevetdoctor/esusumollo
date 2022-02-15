const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const CORS = require('cors');
require('dotenv').config();
const routeHandler = require('./routes/index');
const db = require('./models/index');

const app = express();
const port = process.env.PORT || 4000;

app.use(CORS());
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

routeHandler(app);

// Handles all errors
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(err.status || 400).send({ success: false });
    }
    if (err) console.log(err);
    return res
    .status(err.status || 400)
    .send({ success: false, message: err.message });
});

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to Esusu'
    });
    // res.sendFile(path.join(__dirname, './ui/build/', 'index.html'));
});

app.listen(port, () => {
    console.log('Server running @ port: ', port);
})