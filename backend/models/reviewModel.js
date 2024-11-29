const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');   

  
const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,    
    validate: {
      min: 1,    
      max: 5,    
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,    
  },
}, {
  timestamps: true,    
});

module.exports = Review;
