const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');    

const Feedback = sequelize.define('Feedback', {
  name: {
    type: DataTypes.STRING,    
    allowNull: true,    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  feedbackType: {
    type: DataTypes.ENUM('review', 'general', 'suggestion', 'complaint', 'other'),
    allowNull: false,    
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,    
    allowNull: false,    
  },
}, {
  timestamps: false,    
});

module.exports = Feedback;
