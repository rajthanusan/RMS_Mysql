const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');    

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  person: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reservationDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,    
  },
}, {
  timestamps: true,    
});

module.exports = Booking;
