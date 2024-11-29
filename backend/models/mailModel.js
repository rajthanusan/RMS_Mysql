const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');    

const Mail = sequelize.define('Mail', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mailType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    
  timestamps: true,    
});

module.exports = Mail;
