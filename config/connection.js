require('dotenv').config();

const Sequelize = require('sequelize');

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', typeof process.env.DB_PASSWORD); // Should print 'string'
console.log('DB_URL:', process.env.DB_URL);

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: console.log, // Optional: Enable logging for debugging
    });

module.exports = sequelize;

