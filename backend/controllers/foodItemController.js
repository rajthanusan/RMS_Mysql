const Food = require('../models/Fooditem');   
const path = require('path');

 
const getFoodItems = async (req, res) => {
  try {
    const foods = await Food.findAll();   
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching food items' });
  }
};

 
const addFoodItem = async (req, res) => {
  const { name, category, price, originalPrice, discount, description } = req.body;
  const image = req.file ? req.file.path : "";   

  try {
    const newFood = await Food.create({
      name,
      category,
      price,
      originalPrice,
      discount,
      description,
      image,
    });
    res.status(201).json(newFood);   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding food item' });
  }
};

 
const updateFoodItemStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedFood = await Food.update({ status }, { where: { id }, returning: true, plain: true });

    if (updatedFood[0] === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', food: updatedFood[1] });
  } catch (error) {
    console.error('Error updating food item status:', error);
    res.status(500).json({ message: 'Error updating food item status' });
  }
};

 
const updateFoodItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, originalPrice, discount, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updatedFood = await Food.update(
      {
        name,
        category,
        price,
        originalPrice,
        discount,
        description,
        image: image || undefined,   
      },
      { where: { id }, returning: true, plain: true }
    );

    if (updatedFood[0] === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json(updatedFood[1]);   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating food item' });
  }
};

 
const deleteFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFood = await Food.destroy({ where: { id } });

    if (deletedFood === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting food item' });
  }
};

module.exports = {
  getFoodItems,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  updateFoodItemStatus,
};
