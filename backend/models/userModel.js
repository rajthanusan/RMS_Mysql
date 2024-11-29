const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,  
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    resetCodeExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = User;
