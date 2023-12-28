const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${environment}` });

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());

app.use('/api', require('./routes/tickets'));



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});

module.exports = app; // Export the app for testing purposes
