const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

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
    console.log('Connected to MongoDB');

    // Import and use your routes (UserRoute, CustomerRoute, NicRoute)
    const UserRoute = require('./routes/UserRoute');
    const CustomerRoute = require('./routes/CustomerRoute');
    const NicRoute = require('./routes/NicRoute');

    app.use('/api/v1/user', UserRoute);
    app.use('/api/v1/customer', CustomerRoute);
    app.use('/api/v1/user/nic', NicRoute);

    // Test endpoint
    app.get('/api/v1/test', (req, res) => {
      res.status(200).json({ message: 'success!' });
    });

    // Start the server after successful database connection
    app.listen(serverPort, () => {
      console.log(`Server Running on Port ${serverPort}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application if there's an error connecting to the database
  });
