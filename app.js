// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoose.connection');
const userRoutes = require('./routes/userRoutes');

dotenv.config();  // Load environment variables from .env file

const app = express();

connectDB(); // Connect to MongoDB

app.use(express.json());  // Middleware to parse JSON requests

// Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
