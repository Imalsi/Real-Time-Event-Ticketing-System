const express = require('express');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/events');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Ticket Booking App Server Up and Running!');
});

// Use ticket routes
app.use('/api/tickets', ticketRoutes);

// Use user routes
app.use('/api/users', userRoutes);

// Use event routes
app.use('/api/events', eventRoutes);

module.exports = app;