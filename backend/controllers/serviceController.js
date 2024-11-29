const Service = require('../models/Service');
const path = require('path');

  
exports.createServiceCard = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';   

  try {
    const newService = await Service.create({ title, description, image });
    res.status(201).json(newService);   
  } catch (error) {
    console.error('Error creating service card:', error);
    res.status(500).json({ message: 'Failed to create service card' });
  }
};

  
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();   
    res.status(200).json(services);   
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

  
exports.updateServiceCard = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;   

  try {
    const updateData = { title, description };
    if (image) updateData.image = image;   

      
    const [updated] = await Service.update(updateData, {
      where: { id: req.params.id },
      returning: true,   
    });

    if (updated === 0) {
      return res.status(404).json({ message: 'Service card not found' });
    }

    const updatedService = await Service.findByPk(req.params.id);   
    res.status(200).json(updatedService);   
  } catch (error) {
    console.error('Error updating service card:', error);
    res.status(500).json({ message: 'Failed to update service card' });
  }
};

  
exports.deleteServiceCard = async (req, res) => {
  console.log("Deleting service card with ID:", req.params.id);   
  try {
    const deleted = await Service.destroy({
      where: { id: req.params.id },   
    });

    if (deleted === 0) {
      console.log(`No service found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'Service card not found' });
    }

    res.status(200).json({ message: 'Service card deleted successfully' });   
  } catch (error) {
    console.error('Error deleting service card:', error);
    res.status(500).json({ message: 'Failed to delete service card' });
  }
};
