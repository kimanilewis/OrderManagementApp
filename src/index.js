
const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('./routes/orders');
const creditRouter = require('./routes/credit');
const statisticsRouter = require('./routes/statistics');

const app = express();

app.use(bodyParser.json());
app.use('/orders', ordersRouter);
app.use('/credit', creditRouter);
app.use('/statistics', statisticsRouter);

module.exports = app;
