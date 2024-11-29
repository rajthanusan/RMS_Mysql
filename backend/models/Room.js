const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');    

  
const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  type: {
    type: DataTypes.ENUM('Room', 'Hall'),
    allowNull: false,    
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,    
});

module.exports = Room;
