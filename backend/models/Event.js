const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

  
const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,    
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,    
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Active',    
    validate: {
      isIn: [['Active', 'Inactive']],    
    },
  },
}, {
  timestamps: true,    
});

module.exports = Event;
