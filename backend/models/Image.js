const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');    

  
const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,    
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,    
    validate: {
      isIn: [['Ambiance', 'Food', 'Drinks', 'Customers']],    
    },
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,    
  },
}, {
  timestamps: false,    
});

module.exports = Image;
