const winston = require('winston');

// Membuat logger instance
const logger = winston.createLogger({
  level: 'info', // Level default untuk logging
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Format JSON untuk log
  ),
  transports: [
    // Transportasi untuk log ke konsol
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Menambahkan warna untuk konsol
        winston.format.simple() // Format log sederhana di konsol
      )
    }),
    // Transportasi untuk log ke file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Export logger instance
module.exports = logger;
