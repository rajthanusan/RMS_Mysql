const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');   

const Service = sequelize.define('Service', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,    
  },
});

module.exports = Service;
