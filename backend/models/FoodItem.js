const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Food = sequelize.define('Food', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Main Courses',
        validate: {
            isIn: [['Main Courses', 'Appetizers', 'Desserts', 'Drinks', 'Snacks']],   
        },
    },
    price: {
        type: DataTypes.FLOAT,   
        allowNull: false,
    },
    originalPrice: {
        type: DataTypes.FLOAT,   
        allowNull: false,
    },
    discount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
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

module.exports = Food;
