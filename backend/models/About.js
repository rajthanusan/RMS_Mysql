const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');    

const About = sequelize.define('About', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  teamDescription: {
    type: DataTypes.STRING,
    allowNull: false,    
  }
}, {
  timestamps: false,    
});

module.exports = About;
