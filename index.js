const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');

// Set up express app
const app = express();
const serverPort = process.env.SERVER_PORT || 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas using the connection string from .env
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  
  app.listen(serverPort, () => {
    console.log(`Server Running on Port ${serverPort}`);
  });

})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Import and use your routes (UserRoute, CustomerRoute)
const UserRoute = require('./routes/UserRoute');
const CustomerRoute = require('./routes/CustomerRoute');

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/customer', CustomerRoute);

// Test endpoint
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({ 'message': 'success!' });
});
