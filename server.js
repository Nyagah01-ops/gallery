const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Define routes
const indexRoute = require('./routes/index');
const imageRoute = require('./routes/image');

// Connecting to MongoDB
const mongodb_url = 'mongodb://localhost:27017/';
const dbName = 'darkroom';
mongoose.connect(`${mongodb_url}${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Initializing the Express app
const app = express();

// View Engine setup (assuming you use ejs)
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/', indexRoute);
app.use('/image', imageRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
