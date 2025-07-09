require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

 // Custom logger middleware
app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} - ${req.method} ${req.path}`);
        next();
  });

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/v1/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});