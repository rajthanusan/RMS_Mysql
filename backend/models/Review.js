const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  isActive: { type: Boolean, default: true }, 
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;