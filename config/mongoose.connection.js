const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger')

dotenv.config();  // Load environment variables

const connectDB = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
      logger.info('MongoDB connected.');
    } catch (error) {
      logger.error(`MongoDB connection error ${error}`);
      console.error('MongoDB connection error', error);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;