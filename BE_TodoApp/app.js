require('dotenv').config();
require('./app/database').connect();
const express= require('express');
const logger = require('morgan');

const cookie_parser =require('cookie-parser');
const cors =require('cors');
const indexRouter = require('./routes/index');

const app=express();


app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

app.use('/api', indexRouter);

module.exports =app;