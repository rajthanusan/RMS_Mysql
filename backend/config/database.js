require('dotenv').config();  // Ensure this is at the top of the file to load environment variables

const { Sequelize } = require('sequelize');

// Build the MySQL connection URL using environment variables
const mysqlUrl = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`;

// Initialize Sequelize with the constructed URL
const sequelize = new Sequelize(mysqlUrl, {
  dialect: 'mysql',
  logging: false, // Set to true to see SQL queries
});

module.exports = sequelize;
