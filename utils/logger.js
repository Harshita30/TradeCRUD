// utils/logger.js
const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/%DATE%.log',  // Store logs in files named by date (e.g., logs/2024-11-21.log)
  datePattern: 'YYYY-MM-DD',    // Define the date pattern
  zippedArchive: true,          // Compress old logs into .gz format
  maxSize: '20m',               // Max size of each log file (e.g., 20MB)
  maxFiles: '24d'               // Keep logs for 24 days before rotating
});

// Custom log format
const customFormat = winston.format.printf(({ timestamp, level, message, meta }) => {
  return `[${timestamp}] [${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    // winston.format.simple(),
    customFormat,
    winston.format.colorize(),
  ),
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.combine(
        // customFormat,
        winston.format.printf(({ timestamp, level, message, meta }) => {
          return `[${timestamp}] [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
        }),
        winston.format.colorize(),  // Colorize logs for the console
        // winston.format.simple()  // Simple format for console (can be customized)
      ),
    }),
  ]
});

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(winston.format.colorize(), winston.format.simple(), winston.format.timestamp()),
//   transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logs.txt' })],
// });

module.exports = logger;
