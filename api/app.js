var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', indexRouter);

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

module.exports = app;
