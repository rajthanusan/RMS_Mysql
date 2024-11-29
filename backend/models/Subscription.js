const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');      

const Subscription = sequelize.define('Subscription', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,     
    lowercase: true,    
    trim: true,         
  }
}, {
  timestamps: false,    
});

module.exports = Subscription;
