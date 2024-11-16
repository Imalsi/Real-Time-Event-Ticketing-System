const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Define the port
const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});