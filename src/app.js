require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const driverRoutes = require('./routes/driver.routes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/driver', driverRoutes);

module.exports = app;
