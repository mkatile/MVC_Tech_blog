require('dotenv').config();

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log(`.env file found at ${envPath}`);
} else {
  console.error('.env file not found');
}


const { Sequelize } = require('sequelize');

// Print environment variables for debugging
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', typeof process.env.DB_PASSWORD); // Should print 'string'
console.log('DB_URL:', process.env.DB_URL);

let sequelize;

try {
  // Use DB_URL if provided; otherwise, use individual credentials
  if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging only in development
    });
  } else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging only in development
    });
  }

  // Test the connection
  sequelize.authenticate()
    .then(() => console.log('Database connection established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
} catch (error) {
  console.error('Error setting up Sequelize:', error);
}

module.exports = sequelize;


